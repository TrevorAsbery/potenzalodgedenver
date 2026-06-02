(function () {
  function formDataToObject(form) {
    var values = {};

    new FormData(form).forEach(function (value, key) {
      if (!Object.prototype.hasOwnProperty.call(values, key)) {
        values[key] = value;
        return;
      }

      values[key] = Array.isArray(values[key]) ? values[key].concat([value]) : [values[key], value];
    });

    return values;
  }

  window.submitFormBoldForm = function (form) {
    return fetch(form.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataToObject(form)),
    }).then(function (response) {
      if (!response.ok) {
        throw new Error("Submission failed with status " + response.status);
      }

      return response;
    });
  };
})();
