let reportSuccess = [];
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
          await this.saveReport(project, reportFail, "error On");
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
    try {
      const { proyectId } = req.body;
      let project = proyects.find((element) => element.job === proyectId);
      if (project) {
        if (project.state === 0) {
          project.error++;
          await this.saveReport(project, reportFail, "error Off");
        } else {
          project.state = 0;
          project.endTime = Date.now();
          (project.spendTimeDesc =
            (project.endTime - project.beginTime) / 1000 + "secs"),
            (project.spendTime = (project.endTime - project.beginTime) / 1000),
            await this.saveReport(
              project,
              reportSuccess,
              "ok:" + project.job + " timeSpent:" + project.spendTime
            );
        }
      } else {
        project = "does no exist project";
      }
      return project;
    } catch (err) {
      return err;
    }
  }

  static async report(req) {
    let output = {};
    try {
      const { proyectId } = req.params;
      let project = proyects.find((element) => element.job === proyectId);
      if (project) {
        output.fail = reportFail.filter((element) => element.job === proyectId);
        output.success = reportSuccess.filter(
          (element) => element.job === proyectId
        );
        let sumMinutes = 0;
        output.success.forEach((element) => {
          sumMinutes = element.spendTime + sumMinutes;
        });
        output.sumMinutes = sumMinutes / 60;
      } else {
        output = "does no exist project";
      }
      return output;
    } catch (err) {
      return err;
    }
  }

  static async reports() {
    try {
      let output = {};
      output.fail = reportFail;
      output.success = reportSuccess;

      let proyectsSuccess = [];
      output.success.forEach((element) => {
        let project = proyectsSuccess.find(
          (element2) => element2.proyectId === element.job
        );
        if (!project) {
          proyectsSuccess.push({
            proyectId: element.job,
            sumMinutesDesc: element.spendTime / 60 + " minutes",
            sumMinutes: element.spendTime / 60,
          });
        } else {
          proyectsSuccess = proyectsSuccess.filter(function (obj) {
            return obj.proyectId !== element.job;
          });

          proyectsSuccess.push({
            proyectId: element.job,
            sumMinutes: (project.sumMinutes + element.spendTime) / 60,
            sumMinutesDesc:
              (project.sumMinutes + element.spendTime) / 60 + " minutes",
          });
        }
      });

      output.proyectWithTime = proyectsSuccess;

      return output;
    } catch (err) {
      return err;
    }
  }

  static async saveReport(p, r, d) {
    try {
      const item = new Object();
      item.proyect = p.job;
      (item.registerDay = new Date()), (item.description = d);
      r.push({ ...p, ...item });
      return r;
    } catch (err) {
      return err;
    }
  }
}

module.exports = ExecuteSample;
