import { useI18n } from '../i18n/i18n';


export default function ErrorState({ message }) {
    const { t } = useI18n();
    return (
        <div className="text-center text-red-600 py-10">
            <p className="font-semibold">{t('error')}</p>
            {message && <p className="opacity-80 text-sm mt-1">{message}</p>}
        </div>
    );
}