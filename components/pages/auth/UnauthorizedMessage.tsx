import Link from "next/link";

export default function UnauthorizedMessage() {
    return (
        <div className="text-center py-20">
            <h2 className="text-xl font-semibold">You need to log in to access this page</h2>
            <Link href="/auth/login"
                className="nav-link mt-4">
                Go to Login
            </Link>
        </div>
    );
}