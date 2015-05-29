/* Put together by Darkserver
   Credit to Kyurem838 for custom functions from his ModPE help
*/

ModPE.matchMcpe = function(version){
	if(version==ModPE.getMinecraftVersion()){
		return true;
	}
	else{
		return false;
	}
};

Level.checkChestForId = function(x,y,z,id,amount,damage){
	if(!amount) amount = 1;
	if(!damage) damage = 0;
	if(!id) id = 0;
	var count = 0;
	for(var i = 0; i < 255; i++) if(Level.getChestSlot(x,y,z,i) == id && Level.getChestSlotData(x,y,z,i) == damage) count += Level.getChestSlotCount(x,y,z,i);
	return count >= amount;
};

ModPE.serverScript = function(toggle){ //Enables ModPE on servers
	com.mojang.minecraftpe.MainActivity.currentMainActivity.get().runOnUiThread(new java.lang.Runnable({run: function() {
		net.zhuoweizhang.mcpelauncher.ScriptManager.isRemote = true; //As in Java, 1 isn't true, the variable must be set to true, and 1 isn't an option.
	}}));
	if(toggle){
		Server.sendChat("BlockLauncher, enable scripts, please and thank you");
	}
};

ModPE.colorMessage = function(message,color){
	switch(color){
		case "RED":
			clientMessage(ChatColor.RED+""+message);
			break;
		case "BLACK":
			clientMessage(ChatColor.BLACK+""+message);
			break;
		case "DARK_BLUE":
			clientMessage(ChatColor.DARK_BLUE+""+message);
			break;
		case "DARK_GREEN":
			clientMessage(ChatColor.DARK_GREEN+""+message);
			break;
		case "DARK_AQUA":
			clientMessage(ChatColor.DARK_AQUA+""+message);
			break;
		case "DARK_RED":
			clientMessage(ChatColor.DARK_RED+""+message);
			break;
		case "DARK_PURPLE":
			clientMessage(ChatColor.DARK_PURPLE+""+message);
			break;
		case "GOLD":
			clientMessage(ChatColor.GOLD+""+message);
			break;
		case "GRAY":
			clientMessage(ChatColor.GRAY+""+message);
			break;
		case "DARK_GRAY":
			clientMessage(ChatColor.DARK_GRAY+""+message);
			break;
		case "BLUE":
			clientMessage(ChatColor.BLUE+""+message);
			break;
		case "GREEN":
			clientMessage(ChatColor.GREEN+""+message);
			break;
		case "AQUA":
			clientMessage(ChatColor.AQUA+""+message);
			break;
		case "LIGHT_PURPLE":
			clientMessage(ChatColor.LIGHT_PURPLE+""+message);
			break;
		 case "YELLOW":
			clientMessage(ChatColor.YELLOW+""+message);
			break;
		case "WHITE":
			clientMessage(ChatColor.WHITE+""+message);
			break;
	}
};

ModPE.colorTipMessage = function(message,color){
	switch(color){
		case "RED":
			ModPE.showTipMessage(ChatColor.RED+message);
			break;
		case "BLACK":
			ModPE.showTipMessage(ChatColor.BLACK+message);
			break;
		case "DARK_BLUE":
			ModPE.showTipMessage(ChatColor.DARK_BLUE+message);
			break;
		case "DARK_GREEN":
			ModPE.showTipMessage(ChatColor.DARK_GREEN+message);
			break;
		case "DARK_AQUA":
			ModPE.showTipMessage(ChatColor.DARK_AQUA+message);
			break;
		case "DARK_RED":
			ModPE.showTipMessage(ChatColor.DARK_RED+message);
			break;
		case "DARK_PURPLE":
			ModPE.showTipMessage(ChatColor.DARK_PURPLE+message);
			break;
		case "GOLD":
			ModPE.showTipMessage(ChatColor.GOLD+message);
			break;
		case "GRAY":
			ModPE.showTipMessage(ChatColor.GRAY+message);
			break;
		case "DARK_GRAY":
			ModPE.showTipMessage(ChatColor.DARK_GRAY+message);
			break;
		case "BLUE":
			ModPE.showTipMessage(ChatColor.BLUE+message);
			break;
		case "GREEN":
			ModPE.showTipMessage(ChatColor.GREEN+message);
			break;
		case "AQUA":
			ModPE.showTipMessage(ChatColor.AQUA+message);
			break;
		case "LIGHT_PURPLE":
			ModPE.showTipMessage(ChatColor.LIGHT_PURPLE+message);
			break;
		 case "YELLOW":
			ModPE.showTipMessage(ChatColor.YELLOW+message);
			break;
		case "WHITE":
			ModPE.showTipMessage(ChatColor.WHITE+message);
			break;
	}
};

/* Custom Functions by Kyurem838*/
Level.getPlayer = function(name) {
	return Server.getAllPlayers[Server.getAllPlayerNames().indexOf(name)];
};

Level.getAllEntities = function(typeId) {
	var retarr = [];
	for(var i in Entity.getAll()) if(Entity.getEntityTypeId(Entity.getAll()[i]) == typeId || (!typeId && typeId != 0)) retarr.push(Entity.getAll()[i]);
	return retarr;
};

Level.clearChest = function(x, y, z) {
	if(Level.getTile(x, y, z) == 54) for(var i = 0; i < 27; i++) Level.setChestSlot(x, y, z, i, 0, 0, 0);
};

Level.spawnJockey = function(x, y, z, mobs) {
	var ents = [];
	if(mobs.length < 2) return [];
	for(var i in mobs) {
		var e = mobs[i];
		if((e > 9 && e < 14) || (e > 31 && e < 37)) ents.push(Level.spawnMob(x, y, z, e, null));
		else {
			if(!(e instanceof Array)) return;
			if(((e[0] < 10 || e[0] > 13) && (e[0] < 32 || e[0] > 36)) || !e[0]) return; 
			var ent = Level.spawnMob(x, y, z, e[0], e[1]);
			if(e[2] || e[2] == 0) Entity.setRenderType(ent, e[2]);
			if(e[3] || e[3] == 0) Entity.setHealth(ent, e[3]);
			if(e[4] || e[4] == 0) Entity.setNameTag(ent, e[4]);
			if(e[5] || e[5] == 0) Entity.setRot(ent, e[5], Entity.getPitch(ent));
			if(e[6] || e[6] == 0) Entity.setRot(ent, Entity.getYaw(ent), e[6]);
		}
	}
	for(var i = ents.length - 1; i; i--) Entity.rideAnimal(ents[i], ents[i - 1]);
	return ents;
};


Level.extinguishFire = function(x, y, z, side) {
	net.zhuoweizhang.mcpelauncher.ScriptManager.nativeExtinguishFire(x, y, z, side);
};

Player.setInventorySlot = function(slot, id, amount, damage) {
	net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSetInventorySlot(slot + 9, id, amount, damage);
};

Player.removeCarriedItem = function() {
	Player.clearInventorySlot(Player.getSelectedSlotId());
};

Player.removeFromCarriedItem = function(amount) {
	Entity.setCarriedItem(Player.getEntity(), Player.getCarriedItemCount() - amount ? Player.getCarriedItem() : 512, Player.getCarriedItem(), Player.getCarriedItemCount() - amount, Player.getCarriedItemData());
};

Player.addToCarriedItem = function(amount) {
	Entity.setCarriedItem(Player.getEntity(), Player.getCarriedItem(), Player.getCarriedItemCount() + amount, Player.getCarriedItemData());
};

Player.removeItemInventory = function(id, amount, damage) {
	if(!amount) amount = 255 * 255;
	if(!damage) damage = 0;
	var count = 0;
	for(var i = 0; i < 255; i++) if(Player.getInventorySlot(i) == id && Player.getInventorySlotData(i) == damage) {
		Player.clearInventorySlot(i);
		count += Player.getInventorySlotCount(i);
	}
	if(count > amount) Player.addItemInventory(id, count - amount, damage);
};

Player.clearInventory = function() {
	for(var i = 0; i < 255; i++) Player.clearInventorySlot(i);
};

Player.checkForInventoryItem = function(id, amount, damage) {
	if(!amount) amount = 1;
	if(!damage) damage = 0;
	if(!id) id = 0;
	var count = 0;
	for(var i = 0; i < 255; i++) if(Player.getInventorySlot(i) == id && Player.getInventorySlotData(i) == damage) count += Player.getInventorySlotCount(i);
	return count >= amount;
};

Item.defineItem = function(id, unlocalizedName, localizedName, stackLimit, maxDamage, category, textureName, additionalTextures, isEquipped) {
	ModPE.setItem(id, textureName, additionalTextures, unlocalizedName, stackLimit ? stackLimit : 64);
	ModPE.langEdit("item." + unlocalizedName + ".name", localizedName);
	Item.setMaxDamage(id, maxDamage);
	Item.setCategory(id, category, 0);
	Item.setHandEquipped(id, isEquipped);
};

Item.defineFoodItem = function(id, unlocalizedName, localizedName, halfHeartsRestored, stackLimit, maxDamage, category, textureName, additionalTextures) {
	ModPE.setFoodItem(id, textureName, additionalTextures, halfHeartsRestored, unlocalizedName, stackLimit ? stackLimit : 64);
	ModPE.langEdit("item." + unlocalizedName + ".name", localizedName);
	Item.setMaxDamage(id, maxDamage);
	Item.setCategory(id, category, 0);
};

Item.getItemByUnlocalizedName = function(unlocalizedName) {
	for(var i = 0; i < 512; i++) if(Item.getName(i, 0, 1)) if(Item.getName(i, 0, 1).split(".")[1] == unlocalizedName) return i;
};

Block.getAllBlocks = function() {
	function is(i) {
		return !Item.getName(i, 0, 1) && (!i || i == 253 || i == 254 || i == 255);
	}
	
	var retarr = [];
	for(var i = 0; i < 256; i++) {
		if(is(i)) retarr.push(i);
		if(Item.getName(i, 0, 1)) if(Item.getName(i, 0, 1).split(".")[0] == "tile") retarr.push(i);
	}
	return retarr;
};

Block.defineBlock = function(id, unlocalizedName, localizedName, textures, baseMaterial, isOpaque, renderShape, destroyTime, explosionResistance, lightLevel, lightOpacity, color, renderLayer, shape) {
	com.mojang.minecraftpe.MainActivity.currentMainActivity.get().runOnUiThread({run: function() {
		var ScriptManager = net.zhuoweizhang.mcpelauncher.ScriptManager;
		try {
			ScriptManager.nativeDefineBlock(id, unlocalizedName, ScriptManager.expandTexturesArray(textures).names, ScriptManager.expandTexturesArray(textures).coords, baseMaterial, isOpaque, renderShape);
			ModPE.langEdit("tile." + unlocalizedName + ".name", localizedName);
			Block.setDestroyTime(id, destroyTime);
			Block.setExplosionResistance(id, explosionResistance);
			Block.setLightLevel(id, lightLevel);
			Block.setLightOpacity(id, lightOpacity);
			if(color instanceof Array) Block.setColor(id, color);
			Block.setRenderLayer(id, renderLayer);
			if(shape instanceof Array) Block.setShape(id, shape[0], shape[1], shape[2], shape[3], shape[4], shape[5]);
		} catch(e) {}
	}});
};

Entity.duplicate = function(entity, x, y, z) {
	var ent = Level.spawnMob(x, y, z, Entity.getEntityTypeId(entity), Entity.getMobSkin(entity));
	Entity.setAnimalAge(ent, Entity.getAnimalAge(entity));
	Entity.setRenderType(ent, Entity.getRenderType(entity));
	Entity.setRot(ent, Entity.getYaw(entity), Entity.getPitch(entity));
	Entity.setHealth(ent, Entity.getHealth(entity));
	Entity.setVelX(ent, Entity.getVelX(entity));
	Entity.setVelY(ent, Entity.getVelY(entity));
	Entity.setVelZ(ent, Entity.getVelZ(entity));
	Entity.setNameTag(ent, Entity.getNameTag(entity));
};

Item.setName = function(id, damage, name) {
	if(Item.getName(id, damage, 1)) ModPE.langEdit(Item.getName(id, damage, 1) + ".name", name);
};

Item.getAllItems = function() {
	var retarr = [];
	for(var i = 0; i < 512; i++) if(Item.getName(i, 0, 1)) if(Item.getName(i, 0, 1).split(".")[0] == "item") retarr.push(i);
	return retarr;
};

ModPE.downloadFile = function(url, downloadDir, fileName) {
	var file = new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/" + dowloadDir + (downloadIr.charAt(downloadDir.length - 1) == "/" ? fileName : "/" + fileName));
	file.createNewFile();
	var fos = new java.io.FileOutputStream(file);
	var response = android.net.http.AndroidHttpClient.newInstance("ModPE.downloadFile()").execute(new org.apache.http.client.methods.HttpGet(url)).response.getEntity().writeTo(fos);
	fos.close();
};
/* Custom Functions from Kyurem838 */

/*
Methods:

ModPE.colorMessage(msg,color); //makes a colored clientMessage();
//colors must me BL ChatColor's aka RED PURPLE GOLD GREEN BLUE CYAN ect.
ModPE.colorTipMessage(msg,color); //makes a colored ModPE.showTipMessage();
ModPE.downloadFile(URL, downloadDir, fileName); //Downloads the specified file from the specified URL in the specified directory with the specified file name
ModPE.serverScript(boolean); //turns scripting on for servers, and enables Server.sendChat();

Level.checkChestForId(x,y,z,id,amount,damage); //Checks the specified Id, amount, and damage is in the specified Chest; only the id is required
Level.clearChest(x, y, z); //Clears the chest at the specified coordinates
Level.extinguishFire(x, y, z, side); //Extinguishes the fire at the specified coordinates and on the specified side.
Level.getPlayer(name); //Gets the player with the specified name
Level.getAllEntities(typeId); //Gets all entities with the specified entity type ID; if a typeId is not entered, it will get all entities
Level.spawnJockey(x, y, z, mobs); //Spawns a jockey at the specified coordinates; the parameter entities takes this structure:
[mob1, mob2, mob3, etc.]
in which only mob1 and mob2 are required and each mob can either be the entity type ID of the mob you waht or can be an array taking this structure:
[typeId, skin, renderType, nameTag, pitch, yaw]
of which only typeId is required.
The first in the array rides the second, which rides the third, etc. This function returns an array containing all the entities spawned.

Player.setInventorySlot(slot, ID, amount, damage); //Sets the specified inventory slot to the item with the specified ID, amount, and damage.
Player.removeCarriedItem(); //Removes the player's carried item
Player.removeFromCarriedItem(amount); //Takes away the specified amount from the item that the player is carrying
Player.removeItemInventory(ID, amount, damage); //Takes away the specified amount of the item with the specfied ID and damage from the player's inventory; if only the ID is entered, all items with that ID will be removed
Player.clearInventory(); //Clears the player's inventory
Player.checkForInventoryItem(ID, amount, damage); //Checks if there is an item with the specfied ID, amount, and damage is in the inventory; only the ID is required

Entity.duplicate(entity, x, y, z); //Duplicates the specified entity at the specified coordinates

Item.getAllItems(); //Gets all items; does not get damage values
Item.setName(ID, damage, name); //Sets the specified item's name to the specified name; only works with items that already have names, e.g. it won't work on invisible bedrock; will also work with blocks
Item.defineItem(ID, unlocalizedName, localizedName, stackLimit, maxDamage, category, textureName, isEquipped, additionalTextures); //Creates a new item with all the specified statuses; only the ID is actually required
Item.defineFood(ID, unlocalizedName, localizedName, halfHeartsRestored, stackLimit, maxDamage, category, textureName, additionalTextures); //Creates a new food item with all the specified statuses; only the ID is actually required
Item.getItemByUnlocalizedName(unlocalizedName); //Gets the item with the specified unlocalized name; also works with blocks; can only get items with the damage value of 0
//The unlocalized name is what goes between item. and .name, so for example, item.stick.name. The localizedName is the actual name, so item.stick.name is Stick. This is just my way of creating a new item or block, and the PC version needs both, unless you want the stick to be called item.stick.name.

Block.getAllBlocks(); //Gets all blocks; does not get damage values
Block.defineBlock(ID, unlocalizedName, localizedName, textures, baseMaterial, isOpaque, renderShape, destroyTime, explosionResistance, lightLevel, lightOpacity, color, renderLayer, shape); //Creates a new block with the specified statuses. The parameter color is an array, like in Block.setColor(), and the parameter shape is an array, containing the x1, y1, z1, x2, y2, and z2 parameters; although this method is already defined, more parameters have been added
//The unlocalized name and localized name is the same as above, except that it isn't item. and .name, but tile. and .name.*/
