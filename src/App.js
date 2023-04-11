import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Loading from "./Loading";

function App() {
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_limit=21&_page=${page}`
      );
      const data = await res.json();
      setCard((prev) => [...prev, ...data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfinityScroll);

    return () => window.removeEventListener("scroll", handleInfinityScroll);
  }, []);

  const handleInfinityScroll = async () => {
    try {
      if (
        document.documentElement.scrollTop + window.innerHeight + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="size" style={{ width: "85vw" }}>
          <Row>
            {card?.map((card, index) => (
              <Col key={index} md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
}

export default App;
