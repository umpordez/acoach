const V = require('argument-validator');

const ModelBase = require('./base');

class ClientModel extends ModelBase {
    async upsert(clientData) {
        V.object(clientData);

        const { _account } = this.ctx;

        return (await this.db.knex('clients').insert({
            ...clientData,
            account_id: _account.id
        }).onConflict(['email', 'account_id'])
            .merge()
            .returning('*'))[0];
    }

    async addReport(clientId, { report, feedback, details }) {
        V.number(clientId);

        return this.db.client_reports.insertOne({
            client_id: clientId,
            report: report,
            feedback: feedback,
            details: details
        });
    }

    async addReportTask(reportId, { description, notifyCoachOn, notifyClientOn }) {
        V.number(reportId);

        return this.db.client_report_tasks.insertOne({
            report_id: reportId,
            task_description: description,
            notify_coach_on: notifyCoachOn,
            notify_client_on: notifyClientOn
        });
    }
}

module.exports = ClientModel;
