import SessionMapContent from './SessionMapContent';

export const metadata = {
    title: 'خريطة O.S. Session Map | Omar Ashraf',
    description:
        'خريطة كل حصة من أولها لآخرها — ٨ خطوات ثابتة في كل حصة برمجة للصف الثاني الثانوي: عنوان الحصة، فحص الواجب، التشييك السريع، خريطة اليوم، الشرح النظري، التطبيق العملي، أسئلة التأكد، واجب التحدي.',
    alternates: {
        canonical: '/os-session-map',
    },
    openGraph: {
        title: 'خريطة O.S. Session Map | Omar Ashraf',
        description: '٨ خطوات ثابتة — كل حصة — كل طالب — بدون استثناء. نظام تعليمي حصري لمنصة البرمجة.',
        type: 'website',
        url: '/os-session-map',
        locale: 'ar_EG',
        siteName: 'Omar Ashraf',
    },
};

export default function OsSessionMapPage() {
    return <SessionMapContent />;
}
