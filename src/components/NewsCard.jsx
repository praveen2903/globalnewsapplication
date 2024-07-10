
function reverseString(str) {
  var s = str.split("");
  var date = s[8] + s[9] + s[7] + s[5] + s[6] + s[4] + s[0] + s[1] + s[2] + s[3];
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
    <div className="card card-side bg-base-100 shadow-xl">
  <figure>
    <img
      src={img}
      alt="" 
      className="h-[200px] w-[200px] py-3 md:h-[300px] md:w-[300px]"/>
  </figure>
  <div className="card-body">
    <h2 className="card-title"> {titl + "."}</h2>
    <p><strong>Published:</strong> {pub_at}</p>
    <p>{desc}</p>
    <p><strong>Source:</strong> {src}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">
        <a
            href={props.url}
            target="_blank"
            rel="noreferrer"
            className="text-white no-underline cursor-pointer my-2 p-2 rounded-md"
          >
            Know More!
          </a></button>
    </div>
  </div>
</div>
  );
}

export default NewsCard;