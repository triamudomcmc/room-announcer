import Link from 'next/link'

export default function Footer() {
  return (
    <section className="mt-8 text-center text-lg">
      <p>หากพบปัญหาใดในการใช้งานระบบ</p>
      <p>
        สามารถรายงานปัญหาได้ที่{' '}
        <Link
          href="mailto:ict@triamudom.ac.th"
          className="font-bold text-tucmc-main"
        >
          ict@triamudom.ac.th
        </Link>
      </p>
    </section>
  )
}
