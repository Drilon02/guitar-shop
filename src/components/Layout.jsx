import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/i18n';


export default function Layout({ children }) {
    const { t, lang, setLang } = useI18n();
    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b bg-white">
                <div className="container py-4 flex items-center gap-4">
                    <Link to="/" className="text-2xl font-bold">🎸 {t('title')}</Link>
                </div>
            </header>
            <main className="container py-6 flex-1">{children}</main>
            <footer className="border-t bg-white">
                <div className="container py-4 flex items-center gap-3">
                    <span className="text-sm opacity-80">{t('footerLang')}:</span>
                    <button onClick={() => setLang('en')} className={`btn ${lang === 'en' ? 'bg-zinc-100' : ''}`}>EN</button>
                    <button onClick={() => setLang('sq')} className={`btn ${lang === 'sq' ? 'bg-zinc-100' : ''}`}>SQ</button>
                </div>
            </footer>
        </div>
    );
}