import WrapperForPage from '@/components/layout/WrapperForPage';
import SubmitStatisticForm from '@/components/pages/Statistics/SubmitStatisticForm';

export default async function DataEntryPage() {
    return (
        <WrapperForPage>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold mb-6">📥 Fill Statistic Data</h1>
                <SubmitStatisticForm />
            </div>
        </WrapperForPage >
    )
}
