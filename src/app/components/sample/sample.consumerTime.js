let reportFail = [];

const proyects = require("../../../../data/data");

class ExecuteSample {
  static async On(req) {
    try {
      const { proyectId } = req.body;
      let project = proyects.find((element) => element.job === proyectId);
      if (project) {
        if (project.state === 1) {
          project.error++;
        } else {
          project.beginTime = Date.now();
          project.state = 1;
          project.spendTime = 0;
          project.error = 0;
        }
      } else {
        project = "does no exist project";
      }
      return project;
    } catch (err) {
      return err;
    }
  }

  static async Off(req) {
  }

  static async report(req) {
  }

  static async reports() {
  }

  static async saveReport(p, r, d) {
  }
}

module.exports = ExecuteSample;
