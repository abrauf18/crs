import { AlertTriangle } from 'lucide-react';

export default function DialogBox({
    isOpen,
    message,
    onYes,
    onNo,
}: {
    isOpen: boolean;
    message: string;
    onYes: () => void;
    onNo: () => void;
}) {
    return (
        <dialog
            open={isOpen}
            className="absolute inset-y-1/3 left-[38%] right-[33%] mobile:top-1/3 mobile:left-1/4 mobile:right-1/4 flex items-center justify-center overflow-y-auto bg-white p-0 z-40"
        >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
            <div className="relative flex flex-col items-center justify-center rounded-xl bg-white p-6">
                <span className="mb-2">
                    <AlertTriangle color="red" width={30} height={30} />
                </span>
                <h2 className="text-xl text-black font-bold">Confirmation</h2>
                <p className="mt-1 text-md text-black font-normal text-center">
                    {message}
                </p>
                <div className="flex justify-between items-center gap-4">
                    <button
                        type="button"
                        className="mt-4 rounded-lg border px-4 py-2 text-black hover:bg-amber-500 hover:text-white"
                        onClick={onYes}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        className="mt-4 rounded-lg border px-4 py-2 text-black hover:bg-amber-500 hover:text-white"
                        onClick={onNo}
                    >
                        No
                    </button>
                </div>
            </div>
        </dialog>
    );
}
