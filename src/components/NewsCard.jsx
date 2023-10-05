import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";

function reverseString(str) {
  var s = str.split("");

  var date =
    s[8] + s[9] + s[7] + s[5] + s[6] + s[4] + s[0] + s[1] + s[2] + s[3];

  return date;
}

function NewsCard(props) {
  props = props.props;
  var desc = props.description;
  var pub_at = props.publishedAt.substring(0, 10);
  pub_at = reverseString(pub_at);
  desc = desc.substring(0, Math.min(150, desc.length));
  var titl = props.title;
  titl = titl.substring(0, Math.min(200, titl.length));
  var src = props.source.name;
  src = src.substring(0, Math.min(20, src.length));

  const img =
    props.image ||
    "https://images.pexels.com/photos/3944454/pexels-photo-3944454.jpeg?auto=compress&cs=tinysrgb&w=600";
  return (
    <Card className="mt-6 w-96 hover:bg-[#67e8f9] shadow-xl my-2 hover:scale-90 duration-500 drop-shadow-2xl p-8">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={img}
          alt=""
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
            {titl + "."}
        </Typography>
        <Typography>
        <div className="flex justify-between my-2">
          <span className="font-bold">{src}</span>
          <span>{pub_at}</span>
        </div>
        <div
          id="c-text"
          className="card-text"
          dangerouslySetInnerHTML={{ __html: desc + "..." }}
        ></div>
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>
            <a
                href={props.url}
                target="_blank"
                rel="noreferrer"
                className="text-white no-underline cursor-pointer my-2 p-2 rounded-md"
                >
                Know More!
            </a>
        </Button>
      </CardFooter>
    </Card>

  );
}

export default NewsCard;