export default function Tabs({ tabs, current, onChange }) {
    return (
        <div className="flex gap-2 border-b mb-4">
            {tabs.map((t) => (
                <button key={t.key} onClick={() => onChange(t.key)} className={`px-4 py-2 -mb-px border-b-2 ${current === t.key ? 'border-black font-semibold' : 'border-transparent opacity-60'}`}>{t.label}</button>
            ))}
        </div>
    );
}