"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const event_service_1 = require("./event.service");
let EventController = class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    addEvent(event) {
        this.eventService.addEvent(event);
        return "Événement ajouté avec succès !";
    }
    async listAllEvents() {
        return this.eventService.getAllEvents();
    }
    getEventByCodePostal(code_postal) {
        if (code_postal) {
            return this.eventService.getEventByCodePostal(code_postal);
        }
        return this.eventService.getAllEvents();
    }
    getEvent(objectid) {
        return this.eventService.getEvent(objectid);
    }
    removeEvent(objectid) {
        this.eventService.removeEvent(objectid);
        return { message: `Événement ${objectid} supprimé avec succès.` };
    }
    getTotalNumberOfEventsByCat(categorie) {
        return this.eventService.getTotalNumberOfEventsByCat(categorie);
    }
    searchEvent({ term }) {
        return this.eventService.search(term);
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], EventController.prototype, "addEvent", null);
__decorate([
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventController.prototype, "listAllEvents", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('code_postal')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Array)
], EventController.prototype, "getEventByCodePostal", null);
__decorate([
    (0, common_1.Get)(':objectid'),
    __param(0, (0, common_1.Param)('objectid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], EventController.prototype, "getEvent", null);
__decorate([
    (0, common_1.Delete)(':objectid'),
    __param(0, (0, common_1.Param)('objectid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "removeEvent", null);
__decorate([
    (0, common_1.Get)('category/:categorie'),
    __param(0, (0, common_1.Param)('categorie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], EventController.prototype, "getTotalNumberOfEventsByCat", null);
__decorate([
    (0, common_1.Post)('search'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], EventController.prototype, "searchEvent", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [event_service_1.EventService])
], EventController);
//# sourceMappingURL=event.controller.js.map