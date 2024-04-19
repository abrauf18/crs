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
            className="absolute inset-y-1/3 inset-x-1/3 mobile:top-1/3 mobile:left-1/4 mobile:right-1/4 flex items-center justify-center overflow-y-auto bg-white p-0 z-40"
        >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
            <div className="relative flex flex-col items-center justify-center rounded-xl bg-white p-6">
                <h2 className=" text-lg font-semibold text-[#353535]">
                    Confrimation
                </h2>
                <p className="mt-1 text-sm text-[#989692]">{message}</p>
                <button
                    type="button"
                    className="mt-4 rounded-lg bg-amber-500 px-4 py-2 text-white"
                    onClick={onYes}
                >
                    Yes
                </button>
                <button
                    type="button"
                    className="mt-4 rounded-lg bg-amber-500 px-4 py-2 text-white"
                    onClick={onNo}
                >
                    No
                </button>
            </div>
        </dialog>
    );
}
