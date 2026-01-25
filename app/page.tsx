import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Home Page</h1>
      <p>this project is created with love by Ranok Raihan</p>
      <Button asChild variant="default">
        <Link className="mr-2" href="https://ranokraihan.com" target="_blank">
          <Link2 /> Visit My Portfolio
        </Link>
      </Button>
    </main>
  );
}
