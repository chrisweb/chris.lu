import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="global">
            <h2>404</h2>
            <p>This page could not be found.</p>
            <Link href="/">Return Home</Link>
        </div>
    )
}