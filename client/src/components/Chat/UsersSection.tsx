import { Plus } from "lucide-react";

function UsersSection() {
  return (
    <div>
      <div className="px-3 py-4 relative z-10 bg-[#232529] flex border-b border-gray-500/30 overflow-x-auto w-screen whitespace-nowrap space-x-4">
        <div>
          <div className=" h-14 aspect-square rounded-full bg-gray-500 flex justify-center items-center">
            <Plus />
          </div>
        </div>
        <div>
          <div className=" h-14 aspect-square rounded-full bg-gray-500"></div>
          <p className="text-center my-1">Anuj</p>
        </div>
        <div>
          <div className=" h-14 aspect-square rounded-full bg-gray-500"></div>
          <p className="text-center my-1">Pranav</p>
        </div>
        <div>
          <div className=" h-14 aspect-square rounded-full bg-gray-500"></div>
          <p className="text-center my-1">Harish</p>
        </div>
        <div>
          <div className=" h-14 aspect-square rounded-full bg-gray-500"></div>
          <p className="text-center my-1">Abhay</p>
        </div>
        <div>
          <div className=" h-14 aspect-square rounded-full bg-gray-500"></div>
          <p className="text-center my-1">Mahesh</p>
        </div>
        <div>
          <div className=" h-14 aspect-square rounded-full bg-gray-500"></div>
          <p className="text-center my-1">Ayush</p>
        </div>
        <div>
          <div className=" h-14 aspect-square rounded-full bg-gray-500"></div>
          <p className="text-center my-1">Nishant</p>
        </div>
      </div>
    </div>
  );
}

export default UsersSection;
