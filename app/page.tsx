

import Floatingemojis from "@/components/FloatingEmojis"
import Leetcode from "./leetcode/page";
export default function Home() {
  return (
  <>
     <div className="relative min-h-screen animated-gradient flex items-center justify-center px-4 text-white overflow-hidden">
     <Floatingemojis/>
      <Leetcode/>
     </div>
   </>
  );
}