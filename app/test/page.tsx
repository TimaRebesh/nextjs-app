import { sayHello } from '@lib/actions';
import React from 'react';

function Test() {
  return (
    <div>
      <form action={sayHello} >
        <button>click</button>
      </form>
    </div>
  );
}

export default Test; 