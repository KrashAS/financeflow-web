import WrapperForPage from '@/components/layout/WrapperForPage';
import UnauthorizedMessage from '@/components/pages/auth/UnauthorizedMessage';
import SubmitStatisticForm from '@/components/pages/statistics/SubmitStatisticForm';
import { authOptions } from '@/lib/auth/authOptions';
import { getServerSession } from 'next-auth';

export default async function DataEntryPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return <UnauthorizedMessage />;
    return (
        <WrapperForPage>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold mb-6">📥 Fill Statistic Data</h1>
                <SubmitStatisticForm />
            </div>
        </WrapperForPage >
    )
}
