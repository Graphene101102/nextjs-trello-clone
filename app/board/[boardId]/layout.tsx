import initialData from "@/actions/initialData";
import Board from "@/components/Board";
import BoardBar from "@/components/BoardBar";
import { Navbar } from "@/components/Navbar";

export async function generateMetadata({
  params
}:{
  params: { boardId: string }
}) {
  const board = await initialData.find(Board => Board.id == params.boardId)
  return {
    title: board?.title || "Board"
  }
}

const LayoutBoardIdPage = ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { boardId: string }
}) => {
  const imageUrl = "https://c1.wallpaperflare.com/preview/959/40/923/cloud-mountain-snow-trello.jpg";

  return (
    <main className="pt-20 md:pt-24 max-w-6xl 2xl:max-w-screen-xl ">
      <div className="h-full w-full">
        <Navbar />
        <div>
          <BoardBar params={{
          boardId: params.boardId
        }} />
        </div>
        <div className="relative top-4 h-screen w-screen bg-no-repeat bg-cover bg-center bg-fixed bg-full-width bg-full-height " style={{ backgroundImage: `url(${imageUrl})` }}>
          {children}
        </div>
      </div>
    </main>
  );
}

export default LayoutBoardIdPage