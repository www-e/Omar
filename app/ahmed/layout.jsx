import '../styles/ahmed.css';

// Metadata lives in this server layout because app/ahmed/page.jsx is a client component (the iframe
// host needs useEffect), and Next forbids exporting `metadata` from a client file.
export const metadata = {
    title: 'Ahmed Track — 26-Week Automation & IIoT Plan',
    description:
        'A 26-week, Arabic-first study plan for industrial automation and IIoT: 183 vetted resources, a week-by-week '
        + 'simulator calendar, and a public evidence ledger for every link. Built by Omar Ashraf.',
    // Not indexed and not offered to the RSS-style project crawlers: this is a plan written for one named
    // person, not portfolio marketing. Omar can flip this to index:true if he wants it discoverable.
    robots: { index: false, follow: true },
};

export default function AhmedLayout({ children }) {
    return children;
}
