<div className="sticky top-10 sm:top-0 z-10">
<div className="flex header w-full py-2 px-4 body-light justify-between items-center border-b bg-white">
    <div className='flex items-center navbar-title body-bold text-sm sm:text-xs body-light'>
        <GrMapLocation className='text-xl' />
        <span className='ml-2 dark:text-white text-xs sm:text-sm'>
            Lokasi: Jl. Coba No. 30, Musuk, Boyolali, Jawa Tengah
        </span>
    </div>
    <div className="flex justify-center items-center text-4xl">
        <div className='flex justify-center items-center pr-3'>
            <IoIosNotificationsOutline className="dark:text-white mr-4 cursor-pointer text-xl sm:text-2xl" />
            <ModeToggle />
        </div>
        <img src="/profile.png" alt="Profile Picture" className='border-l ml-3 pl-5' />
        <RiArrowDropDownLine className="dark:text-white mx-1" />
    </div>
</div>
<div className="flex header py-2 px-4 body-light justify-between items-center border-b bg-white">
    <div className='flex body-bold text-2xl'>
        Grafik
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-4xl">
        <DropdownMenu>
            <DropdownMenuTrigger className='border p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
                30 menit
                <RiArrowDropDownLine className="dark:text-white text-center text-2xl" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='body-light'>
                <DropdownMenuSeparator />
                <DropdownMenuItem>30 Menit</DropdownMenuItem>
                <DropdownMenuItem>1 Jam</DropdownMenuItem>
                <DropdownMenuItem>1 Hari</DropdownMenuItem>
                <DropdownMenuItem>1 Minggu</DropdownMenuItem>
                <DropdownMenuItem>1 Bulan</DropdownMenuItem>
                <DropdownMenuItem>1 Kelompok</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <Button variant={"green"}>
            <MdOutlineFileDownload className='text-4xl pr-2' />
            Unduh data
        </Button>
    </div>
</div>
</div>