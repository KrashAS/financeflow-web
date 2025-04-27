import SubmitStatisticForm from '@/components/pages/Statistics/SubmitStatisticForm';

export default function DataEntryPage() {
    return (
        <main className="p-0 pt-8 sm:p-4 sm:pt-6 max-w-[1400px] mx-auto">
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold mb-6">📥 Fill Statistic Data</h1>
                <SubmitStatisticForm />
            </div>
        </main>
    );
}
