import Link from "next/link";

export default function Footer() {
  return (
    <section className="mt-8 text-center text-lg">
      <p>หากพบปัญหาใดในการใช้งานระบบ</p>
      <p>
        สามารถรายงานปัญหาได้{" "}
        <Link href="/" className="text-tucmc-main font-bold">
          ที่นี่
        </Link>
      </p>
    </section>
  );
}
