// Made by Camille Christie
import Link from "next/link";
export default function Header() {
    return (
        <header>
            <h2>Daily Task Tracker</h2>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/addtask">Add Task</Link>
            </nav>
        </header>
    );
}