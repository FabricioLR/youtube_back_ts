async function clear(){
    await User.destroy({ where: {}, force: true })
    await Video.destroy({ where: {}, force: true })
    await Historic.destroy({ where: {}, force: true })

    await sequelize.drop()
    //await sequelize.query("DROP TABLE name")
}

clear()