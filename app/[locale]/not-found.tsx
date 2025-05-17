import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4">
            <h2 className="text-3xl font-bold mb-4">404 – Not Found</h2>
            <p className="text-lg mb-6 text-center max-w-md">
                We couldn&apos;t find the page you&apos;re looking for.
            </p>
            <Link
                href="/"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
            >
                Return Home
            </Link>
        </div>
    );
}