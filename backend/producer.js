
const getKafkaProducer = async () => {
    const producer = new Kafka({
        clientId: "my-app",
        brokers: ["localhost:9092"],
    });

    producer.connect().then(() => {
        console.log("Producer connected");
    })  .catch((err) => {
        console.log("Producer connection error", err);
    });

    return producer;
}

export default getKafkaProducer;