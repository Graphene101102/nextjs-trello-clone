'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import initialData, { Board as BoardType } from '@/actions/initialData';
import Link from 'next/link';
import { CircleUserRound, Eye, Heart, PanelsTopLeft, Settings } from 'lucide-react';
// import Board from '@/components/Board';

type homePageProps = {
  board: BoardType | undefined
};

// export async function generateStaticParams() {
//   const paths = initialData.map(board => ({
//     params: { id: board.id },
//   }));

//   return { paths, fallback: true };
// }

const getBoard = async (): Promise<BoardType[]> => {
  return new Promise((resolve) => {
    // Sử dụng setTimeout để giả lập xử lý bất đồng bộ (API call)
    setTimeout(() => {
      resolve(initialData);
    }, 1000); // Giả lập thời gian chờ 1 giây
  });
};


const homePage = (/*{ board }: homePageProps*/) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem("user")) {
        console.log("cần đăng nhập trước!")
        router.push('/login');
      }
    }
  }, []);

  const [boards, setBoards] = useState<BoardType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBoard();
      setBoards(data);
    };

    fetchData();
  }, []);

  console.log(boards)

  if (!boards) {
    return <div>Board not found</div>;
  }

  return (
    <div className='w-full'>
      <div className="font-medium flex items-center mb-1 pl-2 text-xl">
        YOUR WORKSPACES
      </div>
      <div className="flex-col grid-rows-fr ">
        <div className="flex flex-row ">
          <div className='flex pt-4 pl-2'>
            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRuFY23z_1MmVFfIWv2HLNpBNvwU_rYCIU9_oqbZnGTTh6QG1ro" alt="" className="mr-2 h-9 rounded-md" />
            <div className='text-xl'>Graphene</div>
          </div>
          <ul className='flex mr-20 ml-20' style={{ right: 0 }}>
            <li>
              <Link className="flex h-8 m-2 rounded-md bg-neutral-500/10 transition text-start no-underline hover:no-underline " href="/">
                <PanelsTopLeft className="rounded-sm size-4 m-2 object-cover " />
                <span className="m-2 text-xs"> Boards </span>
              </Link>
            </li>
            <li>
              <Link className="flex m-2 rounded-md bg-neutral-500/10 transition text-start no-underline hover:no-underline " href="/">
                <Heart className="rounded-sm size-4 m-2 object-cover " />
                <span className="m-2 text-xs"> Highlights </span>
              </Link>
            </li>
            <li>
              <Link className="flex m-2 rounded-md bg-neutral-500/10 transition text-start no-underline hover:no-underline " href="/">
                <Eye className="rounded-sm size-4 m-2 object-cover " />
                <span className="m-2 text-xs"> Views </span>
              </Link>
            </li>
            <li>
              <Link className="flex m-2 rounded-md bg-neutral-500/10 transition text-start no-underline hover:no-underline " href="/">
                <CircleUserRound className="rounded-sm size-4 m-2 object-cover " />
                <span className="m-2 text-xs"> Members </span>
              </Link>
            </li>
            <li>
              <Link className="flex m-2 rounded-md bg-neutral-500/10 transition text-start no-underline hover:no-underline " href="/">
                <Settings className="rounded-sm size-4 m-2 object-cover " />
                <span className="m-2 text-xs"> Settings </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap pt-4">
          <div className="flex flex-wrap">
            {boards.map((board) => (
              <div key={board.id} className="p-2">
                <div
                  className="relative p-2 border rounded-md shadow-md bg-cover bg-center"
                  style={{ backgroundImage: `url(${board.cover})`, height: 100, width: 190 }}
                  onClick={() => {
                    router.push(`/board/${board.id}`);
                  }}
                >
                  <div className="absolute  h-8  flex items-center justify-between px-0.5 py-0.5">
                    <h3 className="text-white font-semibold">{board.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='p-2'>
            <div
              className="relative p-2 border rounded-md shadow-md bg-gray-50 opacity-50"
              style={{ height: 100, width: 190 }}
            // onClick={addNewBoard}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-black">Create new board</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  );
};


export default homePage;