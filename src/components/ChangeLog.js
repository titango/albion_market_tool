import React,{useState, useEffect} from 'react';
import marked from 'marked';

import versionPath from '../versions.md';

const ChangeLog = () => {
  const [markContent, setMarkContent] = useState("");
  
  useEffect(() => {
    fetch(versionPath)
    .then(response => {
      return response.text()
    })
    .then(text => {
      setMarkContent(marked(text));
    })
  },[])
  return(
    <div>
      <article dangerouslySetInnerHTML={{__html: markContent}}></article>
    </div>
  )
}

export default ChangeLog;