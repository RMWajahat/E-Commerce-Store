const SectionHeading = (props) => {
    return (
        <div className="flex items-center justify-center bg-gray-100 py-4">
            <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl">
                <div className="max-w-md mx-auto space-y-2">
                    {/* Component starts here */}
                    <h2 className="flex flex-row flex-nowrap items-center">
                        <span
                            className="flex-grow block border-t border-black"
                            aria-hidden="true"
                            role="presentation"
                        />
                        <span className="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                            {props.heading}
                        </span>
                        <span
                            className="flex-grow block border-t border-black"
                            aria-hidden="true"
                            role="presentation"
                        />
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default SectionHeading;
