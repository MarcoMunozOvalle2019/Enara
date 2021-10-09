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
  }

  static async report(req) {
  }

  static async reports() {
  }

  static async saveReport(p, r, d) {
    try {
        const item = new Object();
        item.proyect = p.job;
        (item.registerDay = new Date()), (item.description = d);
        r.push({ ...p, ...item });
        return r;
       } 
      catch (err) {
        return err;
      }
  }
}

module.exports = ExecuteSample;
