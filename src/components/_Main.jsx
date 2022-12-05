import Header from "./Header";
import Nav from "./Nav";
import ReviewsList from "./ReviewsList";

export default function Home() {
  return (
    <div>
      <Header className="Header"></Header>
      <Nav></Nav>
      <ReviewsList></ReviewsList>
    </div>
  );
}
