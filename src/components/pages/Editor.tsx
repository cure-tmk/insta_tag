import * as React from 'react';

import { Context } from '~/context';
import * as EditorDuck from '~/ducks/EditorDuck';

const Editor = () => {
  const { state, dispatch } = React.useContext(Context);

  const [text, setText] = React.useState('');
  const hashtags = EditorDuck.selectors.getHashtags(state);
  const withinLimit = EditorDuck.selectors.getHashtagCountWithinLimit(state);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length === 0) {
      return;
    }
    dispatch(EditorDuck.actions.addHashTag({ name: text }));
    setText('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleTextChange} value={text}></input>
        <button type="submit" disabled={!withinLimit}>
          add
        </button>
      </form>
      <ul>
        {hashtags.map((hashtag, idx) => {
          return <li key={idx}>{hashtag}</li>;
        })}
      </ul>
    </>
  );
};

export default Editor;
