// "use client"

import Board from "@/components/Board"

const boardIdPage = ({ params }: { params: { boardId: string } }) => {
    const boardId = params.boardId as string    

    return (
        <Board params={{
            boardId: boardId
        }} />
    )
}

export default boardIdPage