interface WarningModalProps {
    title?: string,
    message?: string,
    btnYes?: string,
    btnNo?: string,
    onYes?: () => void,
    onNo?: () => void,
}


export default function WarinigModal({ title, message, btnYes, btnNo, onYes, onNo }: WarningModalProps) {

    return (
        <div role="dialog" aria-modal="true" aria-labelledby="dialog-title" className="relative z-10">
            <div aria-hidden="true" className="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 text-red-600">
                                        <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 id="dialog-title" className="text-base font-semibold text-gray-900">{title}</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">{message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto cursor-pointer"
                                onClick={onYes}
                            >
                                {btnYes}
                            </button>
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer"
                                onClick={onNo}
                            >
                                {btnNo}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}