import ChatSection from "@/components/Chat/ChatSection";
import Header from "@/components/Chat/Header";
import UsersSection from "@/components/Chat/UsersSection";

function Chats() {
  return (
    <section className="w-full flex items-center flex-col ">
      {/* chat header */}
      <Header />
      <div className="flex flex-col justify-between items-center">
        {/* users section */}
        <UsersSection />

        {/* chat section */}
        <ChatSection />
      </div>
    </section>
  );
}

export default Chats;
