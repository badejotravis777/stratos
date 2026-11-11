import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FunctionsHttpError } from '@supabase/supabase-js';
import {
  LuShieldCheck,
  LuShieldAlert,
  LuFileText,
  LuUpload,
  LuX,
  LuCopy,
  LuCheck,
  LuArrowLeft,
  LuTriangleAlert,
  LuCircleHelp,
  LuThumbsUp,
  LuHistory,
} from 'react-icons/lu';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import ChatSidebar from '../components/ChatSidebar';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import './DealCheck.css';

const PLATFORMS = [
  'Instagram', 'TikTok', 'YouTube', 'X', 'LinkedIn', 'Twitch',
  'Snapchat', 'Facebook', 'Pinterest', 'Podcast', 'Newsletter', 'Other',
];

const CURRENCIES = [
  'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'NZD', 'INR', 'NGN', 'GHS', 'KES', 'ZAR',
  'BRL', 'MXN', 'JPY', 'KRW', 'SGD', 'PHP', 'IDR', 'AED', 'SAR', 'TRY', 'PLN', 'SEK', 'CHF',
];

const VERDICTS = {
  take_it: { label: 'Take it', tone: 'good' },
  negotiate: { label: 'Negotiate', tone: 'warn' },
  walk_away: { label: 'Walk away', tone: 'bad' },
};

const LOADING_STEPS = [
  'Reading the deal…',
  'Checking for scam signs…',
  'Looking at usage rights and exclusivity…',
  'Working out what you should charge…',
  'Writing your counter-offer…',
];

const MAX_PDF_BYTES = 4 * 1024 * 1024;
const STATS_KEY = 'deal-check:creator';

const EXAMPLE_DEAL = `Hi! We love your content 😍 We're Glow Theory, a clean skincare brand, and we'd love you as a brand ambassador.

We're offering $300 for 1 Reel + 3 Stories about our new Vitamin C serum. We'll need the raw footage too.

As part of the deal we get usage rights to the content in perpetuity across all channels including paid ads, and you can't work with any other skincare or beauty brand for 12 months.

Payment is net 90 after the campaign ends. Can you confirm by tomorrow? 🙏`;

const loadStats = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STATS_KEY) || 'null');
    return saved && typeof saved === 'object' ? saved : null;
  } catch {
    return null;
  }
};

const saveStats = (stats) => {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    /* storage unavailable: the form still works */
  }
};

const formatMoney = (amount, currency) => {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) return '—';
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      maximumFractionDigits: amount >= 100 ? 0 : 2,
    }).format(amount);
  } catch {
    return `${Math.round(amount).toLocaleString()} ${currency}`;
  }
};

const toNumber = (value) => {
  if (value === '' || value === null || value === undefined) return null;
  const n = Number(String(value).replace(/[,\s]/g, ''));
  return Number.isFinite(n) && n >= 0 ? n : null;
};

const readPdf = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
    reader.onerror = () => reject(new Error('read failed'));
    reader.readAsDataURL(file);
  });

async function describeError(error) {
  if (error instanceof FunctionsHttpError) {
    const status = error.context?.status;
    if (status === 404) return { text: "Deal Check isn't switched on yet. Check back soon.", limit: false };
    try {
      const body = await error.context.json();
      if (body?.error) return { text: body.error, limit: body.code === 'limit_reached' };
    } catch {
      /* fall through */
    }
  }
  return { text: "Can't reach Deal Check right now. Please try again.", limit: false };
}

const CopyButton = ({ text, label = 'Copy' }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the text is still selectable */
    }
  };

  return (
    <button type="button" className="dc-copy-btn" onClick={copy}>
      {copied ? <LuCheck aria-hidden="true" /> : <LuCopy aria-hidden="true" />}
      {copied ? 'Copied' : label}
    </button>
  );
};

const RateComparison = ({ result }) => {
  const { fair_rate: rate, summary } = result;
  const offered = summary.offered_fee;
  const sameCurrency = summary.offered_currency && summary.offered_currency.toUpperCase() === rate.currency;
  if (typeof offered !== 'number' || offered <= 0 || !sameCurrency) return null;

  const mid = (rate.low + rate.high) / 2;
  if (offered < rate.low) {
    const gap = Math.round(((mid - offered) / mid) * 100);
    return (
      <p className="dc-rate-compare is-low">
        They offered <strong>{formatMoney(offered, rate.currency)}</strong>, about {gap}% under a fair fee.
      </p>
    );
  }
  if (offered > rate.high) {
    return (
      <p className="dc-rate-compare is-high">
        They offered <strong>{formatMoney(offered, rate.currency)}</strong>, above the usual range. Check it's real.
      </p>
    );
  }
  return (
    <p className="dc-rate-compare is-fair">
      They offered <strong>{formatMoney(offered, rate.currency)}</strong>, which is within a fair range.
    </p>
  );
};

const DealResult = ({ check, onReset }) => {
  const { result } = check;
  const verdict = VERDICTS[result.verdict] || VERDICTS.negotiate;
  const scam = result.scam_risk || { level: 'none', signals: [] };
  const scamWarning = scam.level === 'medium' || scam.level === 'high';
  const counter = result.counter_offer;
  const counterText = counter.subject ? `Subject: ${counter.subject}\n\n${counter.message}` : counter.message;

  return (
    <div className="dc-result">
      <button type="button" className="dc-back-btn" onClick={onReset}>
        <LuArrowLeft aria-hidden="true" /> Check another deal
      </button>

      <section className={`dc-verdict is-${verdict.tone}`} aria-label="Verdict">
        <div className="dc-score" aria-label={`Deal score ${result.deal_score} out of 100`}>
          <span className="dc-score-num">{result.deal_score}</span>
          <span className="dc-score-of">/100</span>
        </div>
        <div>
          <p className="dc-verdict-label">{verdict.label}</p>
          <h2 className="dc-headline">{result.headline}</h2>
          {result.summary.brand && (
            <p className="dc-verdict-meta">
              {result.summary.brand}
              {result.summary.deliverables.length > 0 && ` · ${result.summary.deliverables.length} deliverable${result.summary.deliverables.length === 1 ? '' : 's'}`}
            </p>
          )}
        </div>
      </section>

      {scamWarning && (
        <section className={`dc-scam is-${scam.level}`} role="alert">
          <LuShieldAlert aria-hidden="true" />
          <div>
            <h3>{scam.level === 'high' ? 'This looks like a scam' : 'Some scam warning signs'}</h3>
            <ul>
              {scam.signals.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </section>
      )}

      <div className="dc-grid">
        <section className="dc-card dc-rate">
          <p className="dc-kicker">What you should charge</p>
          <p className="dc-rate-range">
            {formatMoney(result.fair_rate.low, result.fair_rate.currency)}
            <span> – </span>
            {formatMoney(result.fair_rate.high, result.fair_rate.currency)}
          </p>
          <RateComparison result={result} />
          <p className="dc-rate-basis">{result.fair_rate.basis}</p>
          <p className="dc-confidence">
            Confidence: <strong>{result.fair_rate.confidence}</strong>
            {check.benchmark_sample > 0 && ` · compared with ${check.benchmark_sample} real offers to creators like you`}
          </p>
        </section>

        <section className="dc-card dc-summary">
          <p className="dc-kicker">What they're asking for</p>
          {result.summary.deliverables.length > 0 ? (
            <ul className="dc-deliverables">
              {result.summary.deliverables.map((d) => <li key={d}>{d}</li>)}
            </ul>
          ) : (
            <p className="dc-muted">No clear deliverables in the message.</p>
          )}
          <dl className="dc-terms">
            {[
              ['Pay', result.summary.payment_terms],
              ['Usage', result.summary.usage_rights],
              ['Exclusivity', result.summary.exclusivity],
              ['Timeline', result.summary.timeline],
            ].map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v || <span className="dc-muted">Not stated</span>}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {result.red_flags.length > 0 && (
        <section className="dc-card">
          <h3 className="dc-section-title"><LuTriangleAlert aria-hidden="true" /> Red flags</h3>
          <ul className="dc-flags">
            {result.red_flags.map((f, i) => (
              <li key={`${f.title}-${i}`} className="dc-flag">
                <div className="dc-flag-head">
                  <span className={`dc-sev is-${f.severity}`}>{f.severity}</span>
                  <h4>{f.title}</h4>
                </div>
                {f.quote && <blockquote>“{f.quote}”</blockquote>}
                <p>{f.why_it_matters}</p>
                <p className="dc-ask"><strong>Ask for:</strong> {f.ask_for}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="dc-card dc-counter">
        <div className="dc-counter-head">
          <h3 className="dc-section-title">Your reply, ready to send</h3>
          <CopyButton text={counterText} label="Copy reply" />
        </div>
        {counter.subject && <p className="dc-subject"><strong>Subject:</strong> {counter.subject}</p>}
        <pre className="dc-message">{counter.message}</pre>
      </section>

      <div className="dc-grid">
        {result.missing_terms.length > 0 && (
          <section className="dc-card">
            <h3 className="dc-section-title"><LuFileText aria-hidden="true" /> Missing from the deal</h3>
            <ul className="dc-list">
              {result.missing_terms.map((m) => (
                <li key={m.term}><strong>{m.term}.</strong> {m.why_it_matters}</li>
              ))}
            </ul>
          </section>
        )}

        {result.questions_for_brand.length > 0 && (
          <section className="dc-card">
            <div className="dc-counter-head">
              <h3 className="dc-section-title"><LuCircleHelp aria-hidden="true" /> Ask before you sign</h3>
              <CopyButton text={result.questions_for_brand.map((q) => `- ${q}`).join('\n')} />
            </div>
            <ul className="dc-list">
              {result.questions_for_brand.map((q) => <li key={q}>{q}</li>)}
            </ul>
          </section>
        )}
      </div>

      {result.good_points.length > 0 && (
        <section className="dc-card">
          <h3 className="dc-section-title"><LuThumbsUp aria-hidden="true" /> What's good about it</h3>
          <ul className="dc-list">
            {result.good_points.map((g) => <li key={g}>{g}</li>)}
          </ul>
        </section>
      )}

      <p className="dc-disclaimer">
        Deal Check gives guidance, not legal advice. For big or unusual contracts, have a lawyer look before you sign.
      </p>
    </div>
  );
};

const DealCheck = () => {
  const { profile } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [dealText, setDealText] = useState('');
  const [pdf, setPdf] = useState(null); // { name, base64 }
  const [stats, setStats] = useState(() => ({
    platform: 'Instagram',
    followers: '',
    avgViews: '',
    engagementRate: '',
    niche: '',
    country: '',
    currency: 'USD',
    askingPrice: '',
    ...loadStats(),
  }));

  const [checking, setChecking] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState(null); // { text, limit }
  const [check, setCheck] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [history, setHistory] = useState([]);
  const fileInputRef = useRef(null);

  const nicheName = profile?.niches?.name;

  useEffect(() => {
    if (nicheName) setStats((s) => (s.niche ? s : { ...s, niche: nicheName }));
  }, [nicheName]);

  const loadHistory = useCallback(async () => {
    const { data, error: historyError } = await supabase
      .from('deal_checks')
      .select('id, created_at, title, verdict, deal_score, result')
      .order('created_at', { ascending: false })
      .limit(20);
    if (!historyError && Array.isArray(data)) setHistory(data);
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  useEffect(() => {
    if (!checking) return undefined;
    setStepIndex(0);
    const id = setInterval(() => setStepIndex((i) => Math.min(i + 1, LOADING_STEPS.length - 1)), 6000);
    return () => clearInterval(id);
  }, [checking]);

  const updateStat = (key) => (e) => setStats((s) => ({ ...s, [key]: e.target.value }));

  const onPickFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setError({ text: 'Upload the contract as a PDF, or paste its text instead.', limit: false });
      return;
    }
    if (file.size > MAX_PDF_BYTES) {
      setError({ text: 'That PDF is over 4 MB. Paste the key sections instead.', limit: false });
      return;
    }
    try {
      setPdf({ name: file.name, base64: await readPdf(file) });
      setError(null);
    } catch {
      setError({ text: "Couldn't read that file. Try another one.", limit: false });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (checking) return;
    if (!dealText.trim() && !pdf) {
      setError({ text: "Paste the brand's message or upload their contract first.", limit: false });
      return;
    }

    setChecking(true);
    setError(null);
    saveStats(stats);

    const { data, error: invokeError } = await supabase.functions.invoke('deal-check', {
      body: {
        dealText: dealText.trim(),
        pdfBase64: pdf?.base64 || undefined,
        pdfName: pdf?.name || undefined,
        creator: {
          platform: stats.platform,
          followers: toNumber(stats.followers),
          avgViews: toNumber(stats.avgViews),
          engagementRate: toNumber(stats.engagementRate),
          niche: stats.niche.trim() || null,
          country: stats.country.trim() || null,
          currency: stats.currency,
          askingPrice: toNumber(stats.askingPrice),
        },
      },
    });

    setChecking(false);

    if (invokeError) {
      setError(await describeError(invokeError));
      return;
    }
    if (!data?.result) {
      setError({ text: data?.error || 'Something went wrong. Please try again.', limit: false });
      return;
    }

    setCheck(data);
    setRemaining(typeof data.remaining === 'number' ? data.remaining : null);
    loadHistory();
    window.scrollTo?.({ top: 0, behavior: 'smooth' });
  };

  const reset = () => {
    setCheck(null);
    setDealText('');
    setPdf(null);
    setError(null);
  };

  const openPast = (row) => {
    setCheck({ id: row.id, created_at: row.created_at, title: row.title, result: row.result, benchmark_sample: 0 });
    window.scrollTo?.({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="layout-container">
      <Sidebar />

      <main className="main-content">
        <TopBar
          title="Deal Check"
          niche={nicheName || 'Creator'}
          isChatOpen={isChatOpen}
          onToggleChat={() => setIsChatOpen(!isChatOpen)}
        />

        <div className="main-content-inner dc-page">
          {check ? (
            <DealResult check={check} onReset={reset} />
          ) : (
            <>
              <header className="dc-intro">
                <span className="dc-eyebrow"><LuShieldCheck aria-hidden="true" /> Deal Check</span>
                <h1>Is this brand deal <span className="text-orange">fair?</span></h1>
                <p>
                  Paste a brand's DM, email or contract. In about a minute you'll see the red flags, what you should
                  really charge, and a reply you can send.
                </p>
              </header>

              <form className="dc-form" onSubmit={submit}>
                <section className="dc-card dc-deal-input">
                  <div className="dc-label-row">
                    <label htmlFor="dc-deal" className="dc-label">The brand's message or contract</label>
                    {!dealText && (
                      <button type="button" className="dc-link-btn" onClick={() => setDealText(EXAMPLE_DEAL)}>
                        Try an example
                      </button>
                    )}
                  </div>
                  <textarea
                    id="dc-deal"
                    className="dc-textarea"
                    value={dealText}
                    onChange={(e) => setDealText(e.target.value)}
                    placeholder="Hi! We'd love to work with you on our new launch…"
                    rows={12}
                    maxLength={40000}
                  />

                  <div className="dc-upload-row">
                    {pdf ? (
                      <span className="dc-file-chip">
                        <LuFileText aria-hidden="true" /> {pdf.name}
                        <button type="button" aria-label="Remove PDF" onClick={() => setPdf(null)}>
                          <LuX aria-hidden="true" />
                        </button>
                      </span>
                    ) : (
                      <button type="button" className="dc-upload-btn" onClick={() => fileInputRef.current?.click()}>
                        <LuUpload aria-hidden="true" /> Upload contract (PDF)
                      </button>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf,.pdf"
                      onChange={onPickFile}
                      hidden
                    />
                    <span className="dc-hint">We never store the deal text, only your result.</span>
                  </div>
                </section>

                <section className="dc-card dc-stats">
                  <h3 className="dc-label">Your stats</h3>
                  <p className="dc-hint">The more you add, the sharper your rate.</p>

                  <div className="dc-field">
                    <label htmlFor="dc-platform">Main platform for this deal</label>
                    <select id="dc-platform" value={stats.platform} onChange={updateStat('platform')}>
                      {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
                    </select>
                  </div>

                  <div className="dc-field-row">
                    <div className="dc-field">
                      <label htmlFor="dc-followers">Followers</label>
                      <input id="dc-followers" inputMode="numeric" placeholder="25,000" value={stats.followers} onChange={updateStat('followers')} />
                    </div>
                    <div className="dc-field">
                      <label htmlFor="dc-views">Avg. views</label>
                      <input id="dc-views" inputMode="numeric" placeholder="8,000" value={stats.avgViews} onChange={updateStat('avgViews')} />
                    </div>
                  </div>

                  <div className="dc-field-row">
                    <div className="dc-field">
                      <label htmlFor="dc-er">Engagement %</label>
                      <input id="dc-er" inputMode="decimal" placeholder="4.5" value={stats.engagementRate} onChange={updateStat('engagementRate')} />
                    </div>
                    <div className="dc-field">
                      <label htmlFor="dc-niche">Niche</label>
                      <input id="dc-niche" placeholder="Beauty" value={stats.niche} onChange={updateStat('niche')} maxLength={80} />
                    </div>
                  </div>

                  <div className="dc-field-row">
                    <div className="dc-field">
                      <label htmlFor="dc-country">Where you're based</label>
                      <input id="dc-country" placeholder="Canada" value={stats.country} onChange={updateStat('country')} maxLength={80} />
                    </div>
                    <div className="dc-field">
                      <label htmlFor="dc-currency">Currency</label>
                      <select id="dc-currency" value={stats.currency} onChange={updateStat('currency')}>
                        {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="dc-field">
                    <label htmlFor="dc-ask">What you were going to charge (optional)</label>
                    <input id="dc-ask" inputMode="decimal" placeholder="500" value={stats.askingPrice} onChange={updateStat('askingPrice')} />
                  </div>

                  <button type="submit" className="dc-submit" disabled={checking}>
                    {checking ? 'Checking…' : 'Check this deal'}
                  </button>
                  {remaining !== null && !checking && (
                    <p className="dc-hint dc-remaining">{remaining} free check{remaining === 1 ? '' : 's'} left this month.</p>
                  )}
                </section>
              </form>

              <div aria-live="polite">
                {checking && (
                  <div className="dc-loading">
                    <span className="dc-spinner" aria-hidden="true" />
                    {LOADING_STEPS[stepIndex]}
                  </div>
                )}
                {error && (
                  <div className={`dc-error${error.limit ? ' is-limit' : ''}`} role="alert">
                    {error.text}
                    {error.limit && <a href="/#pricing" className="dc-upgrade">See plans</a>}
                  </div>
                )}
              </div>

              {history.length > 0 && (
                <section className="dc-history">
                  <h3 className="dc-section-title"><LuHistory aria-hidden="true" /> Your past checks</h3>
                  <ul>
                    {history.map((row) => {
                      const v = VERDICTS[row.verdict] || VERDICTS.negotiate;
                      return (
                        <li key={row.id}>
                          <button type="button" onClick={() => openPast(row)}>
                            <span className={`dc-history-score is-${v.tone}`}>{row.deal_score}</span>
                            <span className="dc-history-title">
                              {row.title || 'Brand deal'}
                              <small>{v.label} · {new Date(row.created_at).toLocaleDateString()}</small>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}
            </>
          )}
        </div>
      </main>

      <ChatSidebar
        isOpen={isChatOpen}
        welcomeMessage="Got a brand deal? Run it through Deal Check, then ask me how to pitch or follow up."
        prompts={['DM script', 'Find pitch decks', 'Make money']}
      />
    </div>
  );
};

export default DealCheck;
