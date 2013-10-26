var schedule = (function (self) {
  var paused = false, // 标记状态
      queue  = [];     // 队列

  // 入队
  self.join = function (fn, params) {
    params = params || {};
    var args = [].concat(params.args);

    queue.push(function (_) {
      _.pause();
      setTimeout(function () {
        fn.apply(params.context || null, args);
        _.resume();
      }, params.delay || 1);
    });

    return exec();
  };

  self.pause = function () {
    paused = true;  // 忙碌
    return this;
  };

  // ready and call next
  self.resume = function () {
    paused = false; // 空闲
    setTimeout(exec, 1);
    return this;
  };

  function exec() {
    if (!paused && queue.length) {
      queue.shift()(self);  // 出队
      if (!paused) self.resume();
    }
    return self;
  }

  return self;
}(schedule || {}));



//schedule end

var foo = function () {
  console.log('foo');
};

var muo = {
  x: 'baz',
  bar: function () {
    console.log(this.x);
  }
};

var yell = {x: 'boo'};

var bear = function (x, y) {
  console.log(x + y);
};

schedule
  .join(foo, {
    delay: 1000 // 延时
  })
  .join(muo.bar, {
    delay: 100,
    context: muo // this解析上下文
  })
  .join(muo.bar, {
    delay: 10,
    context: yell // this解析上下文
  })
  .join(bear, {
    delay: 1,
    args: [10, 17] // 为bear函数提供参数
  });