import Floating from '../floating'

export default function(props){
  return (
      <Floating className="w-60 h-[4rem] items-center">
        <h5 className="">{props.username}</h5>
        <p className="ml-2 text-zinc-800">{props.text}</p>
      </Floating>
  );
}
