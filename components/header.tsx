// Made by Camille Christie
// Global comment: This is code for the header of the website, to display the title and links to navigate to each page.
import Link from "next/link";
export default function Header() {
    const linkStyling = "p-1 m-2 text-x1 hover:underline"; // styling for link
    return (
        <header className="flex justify-between items-center h-20">
            <h2 className="text-4x1 font-semibold p-4">Daily Task Tracker</h2>
            // navigation between homepage and task adding page
            <nav className="p-2 m-4">
                <Link href="/" className={linkStyling}>Home</Link>
                <Link href="/addtask" className={linkStyling}>Add Task</Link>
            </nav>
        </header>
    );
}