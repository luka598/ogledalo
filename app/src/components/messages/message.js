import { formatDistanceToNow } from 'date-fns'
import hr from 'date-fns/locale/hr'
import Floating from '../floating'

function formatTimeDelta(timeDelta) {
  const seconds = Math.floor(timeDelta / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years}god`;
  } else if (months > 0) {
    return `${months}mj`;
  } else if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}s`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return "Sad";
  }
}

const timeAgoStyle = 0
function timeAgo(time){
  if (timeAgoStyle == 0){
    return formatTimeDelta(new Date() - new Date(time))
  } else if (timeAgoStyle == 1) {
    formatDistanceToNow(new Date(time), {addSuffix: true, locale: hr})
  }
}

export default function(props){
  return (
    <Floating className={"w-60 h-[4rem] items-center " + props.className}>
    <div className="flex">    
    <h5 className="">{props.username}</h5>
    <h6 className="ml-auto text-sm text-zinc-700">{ timeAgo(props.time) }</h6>
    </div>
    <p className="ml-2 text-zinc-800">{props.text}</p>
    </Floating>
  );
}
