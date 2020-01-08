/*! 版权所有，翻版必究！ */
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "5817980e60db30f8ec0f";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "zaliangMatchDetails";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://127.0.0.1:8080/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/js/zaliangMatchDetails.js")(__webpack_require__.s = "./src/js/zaliangMatchDetails.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/less/header-footer.less":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js!./src/less/header-footer.less ***!
  \*************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nvar ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\nvar ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(/*! ../images/mall_logo.png */ \"./src/images/mall_logo.png\");\nvar ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__(/*! ../images/copyright.png */ \"./src/images/copyright.png\");\nexports = module.exports = ___CSS_LOADER_API_IMPORT___(false);\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);\nvar ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);\n// Module\nexports.push([module.i, \"/**版心**/\\n.container {\\n  width: 1200px;\\n  min-width: 1200px;\\n  height: 100%;\\n  margin: 0 auto;\\n  position: relative;\\n}\\n/**header**/\\n#head .site-topbar {\\n  height: 30px;\\n  font-size: 12px;\\n  line-height: 30px;\\n  background-color: #F5F5F5;\\n}\\n#head .site-topbar .topbar-info {\\n  float: left;\\n}\\n#head .site-topbar .topbar-info .user .user-name {\\n  width: 98px;\\n  height: 30px;\\n  display: block;\\n  padding-left: 8px;\\n  margin: 0;\\n  -webkit-box-sizing: border-box;\\n          box-sizing: border-box;\\n  color: #999;\\n  position: relative;\\n}\\n#head .site-topbar .topbar-info .user .user-name .name {\\n  display: inline-block;\\n  width: 60px;\\n  padding-right: 6px;\\n  text-align: right;\\n  white-space: nowrap;\\n  text-overflow: ellipsis;\\n  overflow: hidden;\\n}\\n#head .site-topbar .topbar-info .user .user-name .iconarrow-down {\\n  display: inline-block;\\n  vertical-align: 10px;\\n  font-size: 12px;\\n}\\n#head .site-topbar .topbar-info .user .user-name.active {\\n  color: #84B130;\\n  background-color: #fff;\\n  border: 1px solid #84B130;\\n  border-bottom: none;\\n}\\n#head .site-topbar .topbar-info .user .user-menu {\\n  width: 98px;\\n  -webkit-box-sizing: border-box;\\n          box-sizing: border-box;\\n  padding: 7px 0;\\n  position: absolute;\\n  top: 30px;\\n  left: 0;\\n  display: none;\\n  background-color: #fff;\\n  text-align: center;\\n  border: 1px solid #84B130;\\n  border-top: none;\\n  z-index: 12;\\n}\\n#head .site-topbar .topbar-info .user .user-menu .user-item {\\n  height: 28px;\\n  margin: 8px 0;\\n}\\n#head .site-topbar .topbar-info .user .user-menu .user-item a {\\n  color: #999;\\n}\\n#head .site-topbar .topbar-info .user .user-menu .user-item:hover {\\n  background-color: #84B130;\\n}\\n#head .site-topbar .topbar-info .user .user-menu .user-item:hover a {\\n  color: white;\\n}\\n#head .site-topbar a {\\n  margin: 0 8px;\\n  color: #999;\\n}\\n#head .site-topbar a:hover {\\n  color: #84B130;\\n}\\n#head .site-topbar a:first-child {\\n  color: #84B130;\\n}\\n#head .site-topbar .sep {\\n  overflow: hidden;\\n  margin: 11px 5px 0;\\n  width: 1px;\\n  height: 10px;\\n  display: inline-block;\\n  background-color: #ccc;\\n}\\n#head .site-header {\\n  height: 120px;\\n}\\n#head .site-header .header-logo {\\n  width: 217px;\\n  height: 69px;\\n  position: absolute;\\n  top: 50%;\\n  left: 0;\\n  -webkit-transform: translateY(-50%);\\n          transform: translateY(-50%);\\n}\\n#head .site-header .header-logo .logo {\\n  display: block;\\n  width: 217px;\\n  height: 69px;\\n  background: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \") no-repeat center;\\n  background-size: cover;\\n}\\n#head .header-nav {\\n  height: 100%;\\n}\\n#head .header-nav .nav-list {\\n  width: 360px;\\n  position: absolute;\\n  top: 50%;\\n  left: 326px;\\n  -webkit-transform: translateY(-50%);\\n          transform: translateY(-50%);\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-pack: justify;\\n      -ms-flex-pack: justify;\\n          justify-content: space-between;\\n  -ms-flex-line-pack: justify;\\n      align-content: space-between;\\n}\\n#head .header-nav .nav-list .nav-item {\\n  width: 120px;\\n  height: 52px;\\n  line-height: 52px;\\n  font-size: 16px;\\n  text-align: center;\\n  position: relative;\\n  -webkit-transition: all 0.2s;\\n  transition: all 0.2s;\\n}\\n#head .header-nav .nav-list .nav-item .link {\\n  padding: 20px 0;\\n  color: #333;\\n}\\n#head .header-nav .nav-list .nav-item .link:hover {\\n  color: #84B130;\\n}\\n#head .header-search {\\n  width: 306px;\\n  height: 48px;\\n  position: absolute;\\n  top: 50%;\\n  right: 160px;\\n  -webkit-transform: translateY(-50%);\\n          transform: translateY(-50%);\\n}\\n#head .header-search .search-form {\\n  position: relative;\\n}\\n#head .header-search .search-form input {\\n  height: 48px;\\n  -webkit-box-sizing: border-box;\\n          box-sizing: border-box;\\n  position: absolute;\\n  top: 0;\\n}\\n#head .header-search .search-form .search-btn {\\n  width: 52px;\\n  right: 0;\\n  color: white;\\n  font-size: 20px;\\n  line-height: 46px;\\n  background-color: #84B130;\\n  cursor: pointer;\\n  -webkit-transition: 0.2s;\\n  transition: 0.2s;\\n}\\n#head .header-search .search-form .search-btn:hover {\\n  background-color: #668a24;\\n}\\n#head .header-search .search-form .search-text {\\n  width: 247px;\\n  right: 51px;\\n  padding: 1px 17px;\\n  background: white;\\n  border: 1px solid #84B130;\\n}\\n#head .header-cart {\\n  width: 110px;\\n  height: 46px;\\n  padding: 0 15px;\\n  line-height: 44px;\\n  text-align: center;\\n  font-size: 14px;\\n  border: 1px solid #eee;\\n  color: #84B130;\\n  position: absolute;\\n  right: 0;\\n  top: 36px;\\n  z-index: 13;\\n  -webkit-transition: 0.2s;\\n  transition: 0.2s;\\n}\\n#head .header-cart .iconfont {\\n  font-size: 18px;\\n}\\n#head .header-cart a {\\n  padding-left: 14px;\\n  color: #84B130;\\n}\\n#head .header-cart .cart-count {\\n  position: absolute;\\n  top: 5px;\\n  left: 42px;\\n  font-size: 12px;\\n  line-height: 12px;\\n  text-align: center;\\n  padding: 1px 6px;\\n  border-radius: 8px;\\n  color: white;\\n  background-color: #84B130;\\n}\\n#head .header-cart.active {\\n  border-color: #84B130;\\n  border-bottom-color: white !important;\\n}\\n#head .dropdown-layer {\\n  width: 334px;\\n  border: 1px solid #84B130;\\n  background-color: white;\\n  display: none;\\n  position: absolute;\\n  right: 0;\\n  top: 83px;\\n  z-index: 12;\\n}\\n#head .dropdown-layer .cart-empty {\\n  height: 87px;\\n  line-height: 88px;\\n  text-align: center;\\n  font-size: 14px;\\n  color: #999;\\n}\\n#head .dropdown-layer .cart-list {\\n  padding: 18px 18px 0;\\n  line-height: 20px;\\n}\\n#head .dropdown-layer .cart-list .cart-item {\\n  height: 60px;\\n  position: relative;\\n  margin-bottom: 18px;\\n}\\n#head .dropdown-layer .cart-list .cart-item:hover .btn-del {\\n  opacity: 1;\\n}\\n#head .dropdown-layer .cart-list .cart-item a {\\n  font-size: 12px;\\n  color: #424242;\\n}\\n#head .dropdown-layer .cart-list .cart-item .thumb {\\n  float: left;\\n}\\n#head .dropdown-layer .cart-list .cart-item .thumb img {\\n  width: 60px;\\n  height: 60px;\\n}\\n#head .dropdown-layer .cart-list .cart-item .name {\\n  float: left;\\n  width: 98px;\\n  height: 40px;\\n  line-height: 20px;\\n  margin: 10px 0 0 12px ;\\n  overflow: hidden;\\n  -webkit-transition: color 0.2s ease;\\n  transition: color 0.2s ease;\\n}\\n#head .dropdown-layer .cart-list .cart-item .name:hover {\\n  color: #84B130;\\n}\\n#head .dropdown-layer .cart-list .cart-item .price {\\n  float: right;\\n  margin: 20px 22px 0 5px;\\n  font-size: 12px;\\n}\\n#head .dropdown-layer .cart-list .cart-item .btn-del {\\n  position: absolute;\\n  top: 20px;\\n  right: 0;\\n  color: #b0b0b0;\\n  opacity: 0;\\n  -webkit-transition: opacity 0.2s ease;\\n  transition: opacity 0.2s ease;\\n}\\n#head .dropdown-layer .cart-list .cart-item .btn-del .iconfont {\\n  font-size: 14px;\\n}\\n#head .dropdown-layer .cart-total {\\n  padding: 15px 18px;\\n  background-color: #fafafa;\\n  font-size: 12px;\\n}\\n#head .dropdown-layer .cart-total .total {\\n  float: left;\\n  width: 135px;\\n  color: #757575;\\n}\\n#head .dropdown-layer .cart-total .total .price {\\n  display: block;\\n  color: #84B130;\\n}\\n#head .dropdown-layer .cart-total .total .price em {\\n  font-size: 24px;\\n}\\n#head .dropdown-layer .cart-total .cart-btn {\\n  float: right;\\n  width: 96px;\\n  height: 38px;\\n  margin-top: 4px;\\n  line-height: 38px;\\n  font-size: 14px;\\n  text-align: center;\\n  color: white;\\n  background: #84B130;\\n  -webkit-transition: 0.2s ease;\\n  transition: 0.2s ease;\\n}\\n#head .dropdown-layer .cart-total .cart-btn:hover {\\n  -webkit-box-shadow: 0 4px 6px 0 rgba(171, 231, 59, 0.2);\\n          box-shadow: 0 4px 6px 0 rgba(171, 231, 59, 0.2);\\n}\\n#head .menu-dropdown .nav-menu {\\n  width: 100%;\\n  padding: 56px 38px 38px 56px;\\n  -webkit-box-sizing: border-box;\\n          box-sizing: border-box;\\n  background-color: #fff;\\n  border: 1px solid #84B130;\\n  position: absolute;\\n  top: 120px;\\n  z-index: 11;\\n  float: left;\\n  display: none;\\n}\\n#head .menu-dropdown .nav-menu .menu-item {\\n  width: 348px;\\n  height: 120px;\\n  -webkit-box-sizing: border-box;\\n          box-sizing: border-box;\\n  margin: 0 20px 20px 0;\\n  text-align: center;\\n  float: left;\\n  border: 1px solid #f3f3f3;\\n  background-color: #fefefe;\\n  -webkit-transition: 0.2s;\\n  transition: 0.2s;\\n}\\n#head .menu-dropdown .nav-menu .menu-item h3 {\\n  font-size: 16px;\\n  color: #333;\\n  margin: 32px 0 8px;\\n}\\n#head .menu-dropdown .nav-menu .menu-item h5 {\\n  font-weight: normal;\\n  font-size: 14px;\\n  color: #999;\\n}\\n#head .menu-dropdown .nav-menu .menu-item:hover:not(.coming) {\\n  background-color: #84B130;\\n  -webkit-box-shadow: 0 8px 12px 0 rgba(171, 231, 59, 0.2);\\n          box-shadow: 0 8px 12px 0 rgba(171, 231, 59, 0.2);\\n}\\n#head .menu-dropdown .nav-menu .menu-item:hover:not(.coming) h3,\\n#head .menu-dropdown .nav-menu .menu-item:hover:not(.coming) h5 {\\n  color: white;\\n}\\n#head .menu-dropdown .nav-menu .coming {\\n  padding: 36px;\\n  cursor: default;\\n}\\n#head .menu-dropdown .nav-menu .coming p {\\n  font-size: 16px;\\n  color: #b3b3b3;\\n  line-height: 24px;\\n}\\n#head .header-title {\\n  float: left;\\n  color: #333;\\n  font-size: 28px;\\n  font-weight: normal;\\n  line-height: 120px;\\n  margin-left: 24px;\\n}\\n/**footer**/\\n#foot .mod-service {\\n  padding: 30px 0;\\n  background-color: #84B130;\\n}\\n#foot .mod-service .service-list {\\n  height: 42px;\\n}\\n#foot .mod-service .service-list .service-item {\\n  float: left;\\n  width: 297px;\\n  color: white;\\n}\\n#foot .mod-service .service-list .service-item .service-unit {\\n  width: 180px;\\n  margin: 0 auto;\\n  position: relative;\\n}\\n#foot .mod-service .service-list .service-item .service-unit .hexagon {\\n  width: 40px;\\n  height: 46px;\\n  -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);\\n          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);\\n  background: white;\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n}\\n#foot .mod-service .service-list .service-item .service-unit .hexagon .service-tit {\\n  width: 35px;\\n  height: 41px;\\n  line-height: 41px;\\n  position: absolute;\\n  left: 50%;\\n  top: 50%;\\n  -webkit-transform: translate(-50%, -50%);\\n          transform: translate(-50%, -50%);\\n  font-size: 21px;\\n  text-align: center;\\n  -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);\\n          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);\\n  background-color: #84B130;\\n}\\n#foot .mod-service .service-list .service-item .service-unit .service-txt {\\n  width: 100%;\\n  height: 42px;\\n  line-height: 44px;\\n  margin-left: 48px;\\n  font-weight: 700;\\n  font-size: 18px;\\n  color: #ffffff;\\n}\\n#foot .copyright {\\n  padding: 10px 0;\\n  font-size: 12px;\\n  background-color: #EAEFE1;\\n  color: #6c6c6c;\\n  position: relative;\\n}\\n#foot .copyright p {\\n  margin: 8px 0;\\n}\\n#foot .copyright p b {\\n  margin: 0 3px;\\n  color: #c0c0c0;\\n}\\n#foot .copyright p .link {\\n  color: #6c6c6c;\\n}\\n#foot .copyright p .link:hover {\\n  color: #84B130;\\n}\\n#foot .copyright p .copyright-auth-ico {\\n  display: inline-block;\\n  width: 103px;\\n  height: 32px;\\n  line-height: 500px;\\n  margin: 0 3px;\\n  background: url(\" + ___CSS_LOADER_URL_REPLACEMENT_1___ + \") no-repeat;\\n}\\n#foot .copyright p .copyright-auth-ico:first-child {\\n  margin-left: 0;\\n  background-position: -205px -111px;\\n}\\n#foot .copyright p .copyright-auth-ico:nth-child(2) {\\n  background-position: -205px -74px;\\n}\\n#foot .copyright p .copyright-auth-ico:nth-child(3) {\\n  background-position: -205px -37px;\\n}\\n#foot .copyright p .copyright-auth-ico:nth-child(4) {\\n  background-position: -205px 0px;\\n}\\n#foot .copyright p .copyright-auth-ico:nth-child(5) {\\n  background-position: 0px -155px;\\n}\\n#foot .copyright .learn-more {\\n  position: absolute;\\n  right: 0;\\n  top: 0;\\n}\\n#foot .copyright .learn-more img {\\n  width: 88px;\\n}\\n#foot .copyright .learn-more span {\\n  width: 88px;\\n  display: block;\\n  margin-top: 8px;\\n  text-align: center;\\n}\\n\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/less/header-footer.less?./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/less/normalized.less":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js!./src/less/normalized.less ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = module.exports = ___CSS_LOADER_API_IMPORT___(false);\nexports.push([module.i, \"@import url(http://at.alicdn.com/t/font_1582201_2dsxyn0uarw.css);\"]);\n// Module\nexports.push([module.i, \"@charset \\\"UTF-8\\\";\\n/*去除标签的默认间距*/\\n* {\\n  margin: 0px;\\n  padding: 0px;\\n}\\n/*去除超链接默认下划线*/\\na {\\n  text-decoration: none;\\n}\\n/*浮动*/\\n.fl {\\n  float: left;\\n}\\n.fr {\\n  float: right;\\n}\\n.clearFix {\\n  zoom: 1;\\n}\\n.clearFix:after {\\n  content: '';\\n  display: block;\\n  height: 0;\\n  visibility: hidden;\\n  clear: both;\\n}\\n/*解决body直接子元素设置百分比高度无法获取的问题*/\\nhtml,\\nbody {\\n  height: 100%;\\n  font-family: Helvetica Neue, Helvetica, Arial, Microsoft Yahei, Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei, sans-serif;\\n}\\n/*列表和表单*/\\nul,\\nli {\\n  list-style: none;\\n}\\n/* 解决因图片撑起容器高度产生偏差的问题  */\\nimg {\\n  vertical-align: middle;\\n}\\nem {\\n  font-style: normal;\\n}\\n/* 去除表单元素的边框和轮廓 */\\ninput,\\nbutton,\\ntextarea {\\n  border: none;\\n  outline: none;\\n}\\n/*  */\\n.hide {\\n  display: none;\\n}\\n/* 弹性布局 */\\n.fixed {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-pack: justify;\\n      -ms-flex-pack: justify;\\n          justify-content: space-between;\\n  -ms-flex-line-pack: justify;\\n      align-content: space-between;\\n}\\n/*图片默认样式*/\\n.lazy-img {\\n  position: relative;\\n}\\n.lazy-img:after {\\n  content: '';\\n  position: absolute;\\n  width: 100%;\\n  height: 100%;\\n  top: 0;\\n  left: 0;\\n  background: rgba(0, 0, 0, 0);\\n}\\n.lazy-img img {\\n  -webkit-transition: all 0.2s ease;\\n  transition: all 0.2s ease;\\n}\\n\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/less/normalized.less?./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/less/zaliangMatchDetails.less":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js!./src/less/zaliangMatchDetails.less ***!
  \*******************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = module.exports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"#head {\\n  background-color: #84B130;\\n}\\n#head .site-header {\\n  height: 80px;\\n  position: relative;\\n}\\n#head .site-header .header-title {\\n  position: absolute;\\n  left: 0;\\n  margin-left: 0;\\n  line-height: 80px;\\n  color: white !important;\\n}\\n#content {\\n  background-color: white;\\n}\\n#content .collocation {\\n  margin-top: 50px;\\n}\\n#content .collocation p {\\n  width: 188px;\\n  height: 18px;\\n  font-weight: 400;\\n  color: #999999;\\n}\\n#content .collocation h3 {\\n  width: 500px;\\n  height: 24px;\\n  font-size: 24px;\\n  font-weight: 400;\\n  color: #666666;\\n  margin-top: 30px;\\n}\\n#content .collocation section {\\n  margin-top: 50px;\\n}\\n#content .collocation section .detailsOne {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n}\\n#content .collocation section .detailsOne .detailsOne_left {\\n  width: 400px;\\n  height: 400px;\\n}\\n#content .collocation section .detailsOne .detailsOne_rigth {\\n  width: 678px;\\n  height: 400px;\\n  background: #f5f5f5;\\n  position: relative;\\n}\\n#content .collocation section .detailsOne .detailsOne_rigth .one {\\n  display: block;\\n  width: 400px;\\n  height: 51px;\\n  font-size: 18px;\\n  font-weight: 400;\\n  line-height: 1.5;\\n  color: #666666;\\n  position: absolute;\\n  left: 67px;\\n  top: 122px;\\n}\\n#content .collocation section .detailsOne .detailsOne_rigth .two {\\n  display: block;\\n  width: 150px;\\n  height: 50px;\\n  background: #f1bc18;\\n  font-size: 24px;\\n  font-weight: 400;\\n  line-height: 50px;\\n  text-align: center;\\n  color: #fefefe;\\n  position: absolute;\\n  left: 63px;\\n  top: 283px;\\n}\\n#content .collocation section .detailsOne .detailsOne_rigth .three {\\n  display: block;\\n  width: 150px;\\n  height: 48px;\\n  border: 1px solid #f1bc18;\\n  font-size: 24px;\\n  font-weight: 400;\\n  line-height: 50px;\\n  text-align: center;\\n  color: #f1bc18;\\n  position: absolute;\\n  left: 213px;\\n  top: 283px;\\n}\\n#content .collocation section .detailsOne .detailsOne_rigth .four {\\n  width: 96px;\\n  height: 18px;\\n  font-size: 18px;\\n  font-weight: 400;\\n  color: #999999;\\n  position: absolute;\\n  left: 389px;\\n  top: 313px;\\n}\\n#content .collocation section .detailsTwo {\\n  margin-top: 30px;\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n}\\n#content .collocation section .detailsTwo .detailsTwo_left {\\n  width: 400px;\\n  height: 400px;\\n}\\n#content .collocation section .detailsTwo .detailsTwo_rigth {\\n  width: 678px;\\n  height: 400px;\\n  background: #f5f5f5;\\n  position: relative;\\n}\\n#content .collocation section .detailsTwo .detailsTwo_rigth .one {\\n  display: block;\\n  width: 400px;\\n  height: 51px;\\n  font-size: 18px;\\n  font-weight: 400;\\n  line-height: 1.5;\\n  color: #666666;\\n  position: absolute;\\n  left: 67px;\\n  top: 122px;\\n}\\n#content .collocation section .detailsTwo .detailsTwo_rigth .two {\\n  display: block;\\n  width: 150px;\\n  height: 50px;\\n  background: #f1bc18;\\n  font-size: 24px;\\n  font-weight: 400;\\n  line-height: 50px;\\n  text-align: center;\\n  color: #fefefe;\\n  position: absolute;\\n  left: 63px;\\n  top: 283px;\\n}\\n#content .collocation section .detailsTwo .detailsTwo_rigth .three {\\n  display: block;\\n  width: 150px;\\n  height: 48px;\\n  border: 1px solid #f1bc18;\\n  font-size: 24px;\\n  font-weight: 400;\\n  line-height: 50px;\\n  text-align: center;\\n  color: #f1bc18;\\n  position: absolute;\\n  left: 213px;\\n  top: 283px;\\n}\\n#content .collocation section .detailsTwo .detailsTwo_rigth .four {\\n  width: 96px;\\n  height: 18px;\\n  font-size: 18px;\\n  font-weight: 400;\\n  color: #666666;\\n  position: absolute;\\n  left: 396px;\\n  top: 313px;\\n}\\n#content .collocation .recommend {\\n  margin: 50px 0;\\n}\\n#content .collocation .recommend .recommend_top ul {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-align: center;\\n      -ms-flex-align: center;\\n          align-items: center;\\n  -webkit-box-pack: center;\\n      -ms-flex-pack: center;\\n          justify-content: center;\\n}\\n#content .collocation .recommend .recommend_top ul .one {\\n  width: 9px;\\n  height: 9px;\\n  background: #f1bc18;\\n  border-radius: 50%;\\n  margin-left: 8px;\\n}\\n#content .collocation .recommend .recommend_top ul .two {\\n  width: 12px;\\n  height: 12px;\\n  background: #f1bc18;\\n  border-radius: 50%;\\n  margin-left: 8px;\\n}\\n#content .collocation .recommend .recommend_top ul .three {\\n  width: 16px;\\n  height: 16px;\\n  background: #f1bc18;\\n  border-radius: 50%;\\n  margin-left: 8px;\\n}\\n#content .collocation .recommend .recommend_top ul .four {\\n  width: 121px;\\n  height: 24px;\\n  font-size: 24px;\\n  font-weight: 400;\\n  color: #333333;\\n  line-height: 20px;\\n  margin: 0 15px;\\n}\\n#content .collocation .recommend .recommend_top ul .five {\\n  width: 16px;\\n  height: 16px;\\n  background: #f1bc18;\\n  border-radius: 50%;\\n  margin-right: 8px;\\n}\\n#content .collocation .recommend .recommend_top ul .six {\\n  width: 12px;\\n  height: 12px;\\n  background: #f1bc18;\\n  border-radius: 50%;\\n  margin-right: 8px;\\n}\\n#content .collocation .recommend .recommend_top ul .seven {\\n  width: 9px;\\n  height: 9px;\\n  background: #f1bc18;\\n  border-radius: 50%;\\n  margin-right: 8px;\\n}\\n#content .collocation .recommend .recommend_bottom {\\n  margin-top: 20px;\\n}\\n#content .collocation .recommend .recommend_bottom ul {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-pack: justify;\\n      -ms-flex-pack: justify;\\n          justify-content: space-between;\\n}\\n#content .collocation .recommend .recommend_bottom ul li {\\n  width: 217px;\\n  height: 296px;\\n  background: #ffffff;\\n  border-radius: 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .one img {\\n  width: 200px;\\n  height: 200px;\\n  background: #5d5d5d;\\n  margin: 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .one h3 {\\n  width: 90px;\\n  height: 17px;\\n  font-size: 18px;\\n  font-weight: 400;\\n  color: #666666;\\n  line-height: 23px;\\n  margin: 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .one span {\\n  display: block;\\n  width: 180px;\\n  height: 13px;\\n  font-size: 12px;\\n  font-weight: 300;\\n  color: #999999;\\n  line-height: 23px;\\n  margin: 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .one p {\\n  display: inline-block;\\n  width: 101px;\\n  height: 22px;\\n  font-size: 20px;\\n  font-weight: 400;\\n  color: #f1bc18;\\n  line-height: 23px;\\n  margin: 10px 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .one section {\\n  display: inline-block;\\n  width: 66px;\\n  height: 14px;\\n  font-size: 14px;\\n  font-weight: 400;\\n  color: #999999;\\n  line-height: 23px;\\n  margin: 10px 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .two img {\\n  width: 200px;\\n  height: 200px;\\n  background: #5d5d5d;\\n  margin: 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .two h3 {\\n  width: 90px;\\n  height: 17px;\\n  font-size: 18px;\\n  font-weight: 400;\\n  color: #666666;\\n  line-height: 23px;\\n  margin: 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .two span {\\n  display: block;\\n  width: 180px;\\n  height: 13px;\\n  font-size: 12px;\\n  font-weight: 300;\\n  color: #999999;\\n  line-height: 23px;\\n  margin: 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .two p {\\n  display: inline-block;\\n  width: 101px;\\n  height: 22px;\\n  font-size: 20px;\\n  font-weight: 400;\\n  color: #f1bc18;\\n  line-height: 23px;\\n  margin: 10px 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .two section {\\n  display: inline-block;\\n  width: 66px;\\n  height: 14px;\\n  font-size: 14px;\\n  font-weight: 400;\\n  color: #999999;\\n  line-height: 23px;\\n  margin: 10px 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .three img {\\n  width: 200px;\\n  height: 200px;\\n  background: #5d5d5d;\\n  margin: 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .three h3 {\\n  width: 90px;\\n  height: 17px;\\n  font-size: 18px;\\n  font-weight: 400;\\n  color: #666666;\\n  line-height: 23px;\\n  margin: 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .three span {\\n  display: block;\\n  width: 180px;\\n  height: 13px;\\n  font-size: 12px;\\n  font-weight: 300;\\n  color: #999999;\\n  line-height: 23px;\\n  margin: 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .three p {\\n  display: inline-block;\\n  width: 101px;\\n  height: 22px;\\n  font-size: 20px;\\n  font-weight: 400;\\n  color: #f1bc18;\\n  line-height: 23px;\\n  margin: 10px 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .three section {\\n  display: inline-block;\\n  width: 66px;\\n  height: 14px;\\n  font-size: 14px;\\n  font-weight: 400;\\n  color: #999999;\\n  line-height: 23px;\\n  margin: 10px 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .four img {\\n  width: 200px;\\n  height: 200px;\\n  background: #5d5d5d;\\n  margin: 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .four h3 {\\n  width: 90px;\\n  height: 17px;\\n  font-size: 18px;\\n  font-weight: 400;\\n  color: #666666;\\n  line-height: 23px;\\n  margin: 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .four span {\\n  display: block;\\n  width: 180px;\\n  height: 13px;\\n  font-size: 12px;\\n  font-weight: 300;\\n  color: #999999;\\n  line-height: 23px;\\n  margin: 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .four p {\\n  display: inline-block;\\n  width: 101px;\\n  height: 22px;\\n  font-size: 20px;\\n  font-weight: 400;\\n  color: #f1bc18;\\n  line-height: 23px;\\n  margin: 10px 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .four section {\\n  display: inline-block;\\n  width: 66px;\\n  height: 14px;\\n  font-size: 14px;\\n  font-weight: 400;\\n  color: #999999;\\n  line-height: 23px;\\n  margin: 10px 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .five img {\\n  width: 200px;\\n  height: 200px;\\n  background: #5d5d5d;\\n  margin: 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .five h3 {\\n  width: 90px;\\n  height: 17px;\\n  font-size: 18px;\\n  font-weight: 400;\\n  color: #666666;\\n  line-height: 23px;\\n  margin: 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .five span {\\n  display: block;\\n  width: 180px;\\n  height: 13px;\\n  font-size: 12px;\\n  font-weight: 300;\\n  color: #999999;\\n  line-height: 23px;\\n  margin: 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .five p {\\n  display: inline-block;\\n  width: 101px;\\n  height: 22px;\\n  font-size: 20px;\\n  font-weight: 400;\\n  color: #f1bc18;\\n  line-height: 23px;\\n  margin: 10px 5px;\\n}\\n#content .collocation .recommend .recommend_bottom ul .five section {\\n  display: inline-block;\\n  width: 66px;\\n  height: 14px;\\n  font-size: 14px;\\n  font-weight: 400;\\n  color: #999999;\\n  line-height: 23px;\\n  margin: 10px 5px;\\n}\\n\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/less/zaliangMatchDetails.less?./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    for (var i = 0; i < modules.length; i++) {\n      var item = [].concat(modules[i]);\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot).concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    // eslint-disable-next-line no-param-reassign\n    options = {};\n  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign\n\n\n  url = url && url.__esModule ? url.default : url;\n\n  if (typeof url !== 'string') {\n    return url;\n  } // If url is already wrapped in quotes, remove them\n\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    // eslint-disable-next-line no-param-reassign\n    url = url.slice(1, -1);\n  }\n\n  if (options.hash) {\n    // eslint-disable-next-line no-param-reassign\n    url += options.hash;\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, '\\\\n'), \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar stylesInDom = {};\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nfunction listToStyles(list, options) {\n  var styles = [];\n  var newStyles = {};\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var css = item[1];\n    var media = item[2];\n    var sourceMap = item[3];\n    var part = {\n      css: css,\n      media: media,\n      sourceMap: sourceMap\n    };\n\n    if (!newStyles[id]) {\n      styles.push(newStyles[id] = {\n        id: id,\n        parts: [part]\n      });\n    } else {\n      newStyles[id].parts.push(part);\n    }\n  }\n\n  return styles;\n}\n\nfunction addStylesToDom(styles, options) {\n  for (var i = 0; i < styles.length; i++) {\n    var item = styles[i];\n    var domStyle = stylesInDom[item.id];\n    var j = 0;\n\n    if (domStyle) {\n      domStyle.refs++;\n\n      for (; j < domStyle.parts.length; j++) {\n        domStyle.parts[j](item.parts[j]);\n      }\n\n      for (; j < item.parts.length; j++) {\n        domStyle.parts.push(addStyle(item.parts[j], options));\n      }\n    } else {\n      var parts = [];\n\n      for (; j < item.parts.length; j++) {\n        parts.push(addStyle(item.parts[j], options));\n      }\n\n      stylesInDom[item.id] = {\n        id: item.id,\n        refs: 1,\n        parts: parts\n      };\n    }\n  }\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n\n  if (typeof options.attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      options.attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(options.attributes).forEach(function (key) {\n    style.setAttribute(key, options.attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  var styles = listToStyles(list, options);\n  addStylesToDom(styles, options);\n  return function update(newList) {\n    var mayRemove = [];\n\n    for (var i = 0; i < styles.length; i++) {\n      var item = styles[i];\n      var domStyle = stylesInDom[item.id];\n\n      if (domStyle) {\n        domStyle.refs--;\n        mayRemove.push(domStyle);\n      }\n    }\n\n    if (newList) {\n      var newStyles = listToStyles(newList, options);\n      addStylesToDom(newStyles, options);\n    }\n\n    for (var _i = 0; _i < mayRemove.length; _i++) {\n      var _domStyle = mayRemove[_i];\n\n      if (_domStyle.refs === 0) {\n        for (var j = 0; j < _domStyle.parts.length; j++) {\n          _domStyle.parts[j]();\n        }\n\n        delete stylesInDom[_domStyle.id];\n      }\n    }\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/images/copyright.png":
/*!**********************************!*\
  !*** ./src/images/copyright.png ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/images/copyright.png\";\n\n//# sourceURL=webpack:///./src/images/copyright.png?");

/***/ }),

/***/ "./src/images/mall_logo.png":
/*!**********************************!*\
  !*** ./src/images/mall_logo.png ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/images/mall_logo.png\";\n\n//# sourceURL=webpack:///./src/images/mall_logo.png?");

/***/ }),

/***/ "./src/js/zaliangMatchDetails.js":
/*!***************************************!*\
  !*** ./src/js/zaliangMatchDetails.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _less_normalized_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../less/normalized.less */ \"./src/less/normalized.less\");\n/* harmony import */ var _less_normalized_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_less_normalized_less__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _less_header_footer_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../less/header-footer.less */ \"./src/less/header-footer.less\");\n/* harmony import */ var _less_header_footer_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_less_header_footer_less__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _less_zaliangMatchDetails_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../less/zaliangMatchDetails.less */ \"./src/less/zaliangMatchDetails.less\");\n/* harmony import */ var _less_zaliangMatchDetails_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_less_zaliangMatchDetails_less__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n//# sourceURL=webpack:///./src/js/zaliangMatchDetails.js?");

/***/ }),

/***/ "./src/less/header-footer.less":
/*!*************************************!*\
  !*** ./src/less/header-footer.less ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src??postcss!../../node_modules/less-loader/dist/cjs.js!./header-footer.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/less/header-footer.less\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\nif (true) {\n  if (!content.locals) {\n    module.hot.accept(\n      /*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src??postcss!../../node_modules/less-loader/dist/cjs.js!./header-footer.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/less/header-footer.less\",\n      function () {\n        var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src??postcss!../../node_modules/less-loader/dist/cjs.js!./header-footer.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/less/header-footer.less\");\n\n        if (typeof newContent === 'string') {\n          newContent = [[module.i, newContent, '']];\n        }\n        \n        update(newContent);\n      }\n    )\n  }\n\n  module.hot.dispose(function() { \n    update();\n  });\n}\n\n//# sourceURL=webpack:///./src/less/header-footer.less?");

/***/ }),

/***/ "./src/less/normalized.less":
/*!**********************************!*\
  !*** ./src/less/normalized.less ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src??postcss!../../node_modules/less-loader/dist/cjs.js!./normalized.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/less/normalized.less\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\nif (true) {\n  if (!content.locals) {\n    module.hot.accept(\n      /*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src??postcss!../../node_modules/less-loader/dist/cjs.js!./normalized.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/less/normalized.less\",\n      function () {\n        var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src??postcss!../../node_modules/less-loader/dist/cjs.js!./normalized.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/less/normalized.less\");\n\n        if (typeof newContent === 'string') {\n          newContent = [[module.i, newContent, '']];\n        }\n        \n        update(newContent);\n      }\n    )\n  }\n\n  module.hot.dispose(function() { \n    update();\n  });\n}\n\n//# sourceURL=webpack:///./src/less/normalized.less?");

/***/ }),

/***/ "./src/less/zaliangMatchDetails.less":
/*!*******************************************!*\
  !*** ./src/less/zaliangMatchDetails.less ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src??postcss!../../node_modules/less-loader/dist/cjs.js!./zaliangMatchDetails.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/less/zaliangMatchDetails.less\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\nif (true) {\n  if (!content.locals) {\n    module.hot.accept(\n      /*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src??postcss!../../node_modules/less-loader/dist/cjs.js!./zaliangMatchDetails.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/less/zaliangMatchDetails.less\",\n      function () {\n        var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/src??postcss!../../node_modules/less-loader/dist/cjs.js!./zaliangMatchDetails.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/less/zaliangMatchDetails.less\");\n\n        if (typeof newContent === 'string') {\n          newContent = [[module.i, newContent, '']];\n        }\n        \n        update(newContent);\n      }\n    )\n  }\n\n  module.hot.dispose(function() { \n    update();\n  });\n}\n\n//# sourceURL=webpack:///./src/less/zaliangMatchDetails.less?");

/***/ })

/******/ });