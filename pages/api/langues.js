const handler = async (req, res) => {
  const data = {
    hello: 'world',
    foo: 'bar',
  };

  res.status(200).json(data);
};

export default handler;
