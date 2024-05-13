import Link from "next/link";

export default function Footer() {
  return (
    <section className="mt-8 text-center text-lg">
      <p>หากพบปัญหาใดในการใช้งานระบบ</p>
      <p>
        สามารถรายงานปัญหาได้{" "}
        <Link
          href="https://www.facebook.com/TRIAMUDOM.SUKSA.SCHOOL"
          className="font-bold text-tucmc-main"
        >
          ที่นี่
        </Link>
      </p>
    </section>
  );
}
