/**
 * JQuery 数字动画
 *
 *
 * requestAnimationFrame h5 新特性，作用就是代替定时器做更加流畅高性能的动画，做可以匹配设备刷新率的动画，
 * 他解决了定时器做动画时间间隔不稳定的问题（也就是解决定时器做动画不流畅的问题）。他的用法与setTimeout差不多。
 *
 * jq的animate中，有使用requestAnimationFrame，但不是全部。
 * 注意【异步竞争】的问题
 */

class digitalAnimation {
  passengerFlowInProgress = false;
  mileageInProgress = false;
  prePassengerFlow = 0;
  passengerFlow = 0;
  preMileage = 0;
  mileage = 0;

  //start: 0,
  //increment: 200,
  //totalElapsed: 0,
  //value: 0, // 存储返回值

  async realRequest() {
    const passengerFlowSelector = "#RealTimePassengerFlow";
    const mileageSelector = "#RealTimeMileage";

    await this.fetchDataAndUpdate();

    this.dynamicValue(
      passengerFlowSelector,
      this.prePassengerFlow,
      this.passengerFlow
    );
    this.dynamicValue(mileageSelector, this.preMileage, this.mileage);

    /*     // setInterval 产生异步竞态问题
    setInterval(async () => {
      await this.fetchDataAndUpdate();

      this.dynamicValue(
        passengerFlowSelector,
        this.prePassengerFlow,
        this.passengerFlow
      );
      this.dynamicValue(mileageSelector, this.preMileage, this.mileage);
    }, 5000); */

    const updateLoop = async () => {
      await this.fetchDataAndUpdate();
      // const resp = await this.delay(5000, 7000); // 延迟5到7秒
      // console.log("===fetchDataAndUpdate===", resp);
      // this.mileage = parseInt(resp, 10);

      this.dynamicValue(
        passengerFlowSelector,
        this.prePassengerFlow,
        this.passengerFlow
      );
      this.dynamicValue(mileageSelector, this.preMileage, this.mileage);
      setTimeout(updateLoop, 5000); // 再次调用自己，确保 5000 毫秒后再次执行
    };

    updateLoop(); // 启动循环
  }

  // 模拟
  delay(minMs, maxMs) {
    return new Promise((resolve) => {
      const delayTime = minMs + Math.random() * (maxMs - minMs);
      setTimeout(() => {
        this.totalElapsed += delayTime;
        if (page.totalElapsed >= 20000) {
          this.value += this.increment;
          this.totalElapsed = 0; // 重置累计时间
        }
        resolve(this.value);
      }, delayTime);
    });
  }

  // 数字动画
  numAnimation({ selector, start = 0, end = 0, duration = 4000 }) {
    $({ countNum: start }).animate(
      { countNum: end },
      {
        duration: duration,
        easing: "linear",
        step: function (now) {
          $(selector).text(Math.floor(now));
        },
        complete: function () {
          $(selector).text(Math.floor(end));
        },
      }
    );
  }

  // 动态设置值
  /* prettier-ignore */
  async dynamicValue(selector, start = 0, end = 0) {
    if ((selector === "#RealTimePassengerFlow" && this.passengerFlowAnimationInProgress) ||(selector === "#RealTimeMileage" && this.mileageAnimationInProgress)) {
      return;
    }

    if (selector === "#RealTimePassengerFlow") {
      this.passengerFlowAnimationInProgress = true;
    } else if (selector === "#RealTimeMileage") {
      this.mileageAnimationInProgress = true;
    }

    try {
      this.numAnimation({
        selector,
        start,
        end,
        duration: 4000,
      });

      if (selector === "#RealTimePassengerFlow") {
        this.prePassengerFlow = end;
      } else if (selector === "#RealTimeMileage") {
        this.preMileage = end;
      }
    } finally {
      if (selector === "#RealTimePassengerFlow") {
        this.passengerFlowAnimationInProgress = false;
      } else if (selector === "#RealTimeMileage") {
        this.mileageAnimationInProgress = false;
      }
    }
  }

  // 请求数据并设置值
  async fetchDataAndUpdate() {
    return new Promise((resolve, reject) => {
      top.learun.httpPost(
        top.$.rootUrl + "/HomePageIndexData/GetHomePageIndexData",
        {},
        function (res) {
          if (res && res.data) {
            this.setValueByHomePageIndexData(res);
            resolve();
          } else {
            reject("Failed to fetch data");
          }
        }
      );
    });
  }

  //
  setValueByHomePageIndexData(res) {
    this.passengerFlow = parseInt(res.data.RealTimePassengerFlow, 10);
    this.mileage = parseInt(res.data.RealTimeMileage, 10);
  }
}
