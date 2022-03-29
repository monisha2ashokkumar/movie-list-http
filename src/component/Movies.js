import Movie from "./Movie";
export default function Movies(props) {
  return (
    <ul>
      {props.movieList.map((item) => (
        <Movie key={item.title} name={item.title}></Movie>
      ))}
    </ul>
  );
}
